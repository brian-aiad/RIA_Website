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
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

      const media = gsap.matchMedia();
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

            ScrollTrigger.batch(revealNodes, {
              start: "top 91%",
              once: true,
              interval: 0.06,
              batchMax: desktop ? 5 : 2,
              onEnter: (batch) => {
                gsap.fromTo(batch, { autoAlpha: 0, y: desktop ? 20 : 12 }, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.52,
                  stagger: 0.04,
                  ease: "power2.out",
                  overwrite: "auto",
                  clearProps: "opacity,visibility,transform",
                });
              },
            });
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
