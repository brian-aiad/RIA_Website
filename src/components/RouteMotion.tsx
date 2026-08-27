import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll effects are deliberately non-critical. The page and its CSS hero
 * entrance paint first; GSAP loads when the browser is idle and owns only the
 * one-shot, transform/opacity reveals below the fold.
 */
export default function RouteMotion({ children, routeKey }: { children: ReactNode; routeKey: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    const setupMotion = async () => {
      // On phones, native scrolling wins. The page keeps its lightweight CSS
      // entrances, while all section content remains in the normal paint flow.
      if (window.matchMedia("(max-width: 799px), (prefers-reduced-motion: reduce)").matches) return;

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

      const media = gsap.matchMedia();
      let revealFallback = 0;
      const context = gsap.context(() => {
        media.add(
          { reduce: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 800px)" },
          (matchContext) => {
            const { reduce, desktop } = matchContext.conditions as { reduce: boolean; desktop: boolean };
            const revealNodes = gsap.utils.toArray<HTMLElement>(".motion-reveal", root);

            if (reduce) {
              gsap.set(revealNodes, { clearProps: "all" });
              return;
            }

            // Read every position first, then stage only content that is still
            // below the fold. This avoids hiding an element at the moment it
            // enters the viewport, which can look like a flash on fast scrolls.
            const revealLine = window.innerHeight * 0.92;
            const positions = revealNodes.map((node) => ({ node, top: node.getBoundingClientRect().top }));
            const stagedNodes = positions.filter(({ top }) => top >= revealLine).map(({ node }) => node);
            const visibleNodes = positions.filter(({ top }) => top < revealLine).map(({ node }) => node);

            if (visibleNodes.length) {
              gsap.set(visibleNodes, { clearProps: "opacity,visibility,transform,willChange" });
            }
            if (!stagedNodes.length) return;

            gsap.set(stagedNodes, {
              opacity: 0.92,
              y: desktop ? 10 : 7,
              willChange: "transform,opacity",
            });

            const revealBatch = (batch: Element[]) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.42,
                stagger: 0.025,
                ease: "power2.out",
                overwrite: "auto",
                clearProps: "opacity,visibility,transform,willChange",
              });
            };

            ScrollTrigger.batch(stagedNodes, {
              start: "top 91%",
              once: true,
              interval: 0.04,
              batchMax: desktop ? 6 : 3,
              onEnter: revealBatch,
              onEnterBack: revealBatch,
            });

            // Programmatic jumps (find-in-page, hash links, screenshots) can
            // skip an entry boundary. Never let enhancement hide content.
            revealFallback = window.setTimeout(() => {
              const stillHidden = stagedNodes.filter((node) => Number(getComputedStyle(node).opacity) < .95);
              if (stillHidden.length) gsap.set(stillHidden, { clearProps: "opacity,visibility,transform,willChange" });
            }, 2500);
          },
        );
      }, root);

      let disposed = false;
      const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
      const frame = window.requestAnimationFrame(refresh);
      const pendingImages = Array.from(root.querySelectorAll("img")).filter((image) => !image.complete);
      pendingImages.forEach((image) => image.addEventListener("load", refresh, { once: true }));

      teardown = () => {
        disposed = true;
        window.cancelAnimationFrame(frame);
        pendingImages.forEach((image) => image.removeEventListener("load", refresh));
        window.clearTimeout(revealFallback);
        media.revert();
        context.revert();
      };
    };

    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(() => void setupMotion(), { timeout: 1800 })
      : globalThis.setTimeout(() => void setupMotion(), 700);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window && typeof idleId === "number") window.cancelIdleCallback(idleId);
      else if (typeof idleId === "number") globalThis.clearTimeout(idleId);
      teardown?.();
    };
  }, [routeKey]);

  return <div ref={scope} className="route-frame">{children}</div>;
}
