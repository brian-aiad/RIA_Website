import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

/**
 * One motion owner for every route. Targets opt in with a class; the controller
 * never scans or animates whole sections. Animations are one-shot and affect
 * compositor-friendly opacity/transform properties only.
 */
export default function RouteMotion({ children, routeKey }: { children: ReactNode; routeKey: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const media = gsap.matchMedia();

      media.add(
        { reduce: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 800px)" },
        (context) => {
          const { reduce, desktop } = context.conditions as { reduce: boolean; desktop: boolean };
          const revealNodes = gsap.utils.toArray<HTMLElement>(".motion-reveal", root);
          const heroChildren = gsap.utils.toArray<HTMLElement>(".hero-copy-enter > *", root);
          const heroVisuals = gsap.utils.toArray<HTMLElement>(".atlas-parallax", root);
          const routeLines = gsap.utils.toArray<HTMLElement>(".route-draw", root);

          if (reduce) {
            gsap.set([...revealNodes, ...heroChildren, ...heroVisuals, ...routeLines], { clearProps: "all" });
            return;
          }

          if (heroChildren.length) {
            gsap.fromTo(heroChildren, { autoAlpha: 0, y: 18 }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              stagger: 0.055,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
            });
          }

          if (heroVisuals.length) {
            gsap.fromTo(heroVisuals, { autoAlpha: 0, y: desktop ? 22 : 12, scale: 0.992 }, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.82,
              delay: 0.08,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
            });
          }

          routeLines.forEach((line) => {
            gsap.fromTo(line, { scaleX: 0, transformOrigin: "left center" }, {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.inOut",
              scrollTrigger: { trigger: line, start: "top 96%", once: true },
              clearProps: "transform",
            });
          });

          ScrollTrigger.batch(revealNodes, {
            start: "top 91%",
            once: true,
            interval: 0.06,
            batchMax: desktop ? 5 : 2,
            onEnter: (batch) => {
              gsap.fromTo(batch, { autoAlpha: 0, y: desktop ? 22 : 14 }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.58,
                stagger: 0.045,
                ease: "power2.out",
                overwrite: "auto",
                clearProps: "opacity,visibility,transform",
              });
            },
          });
        },
      );

      let cancelled = false;
      const refresh = () => { if (!cancelled) ScrollTrigger.refresh(); };
      const frame = window.requestAnimationFrame(refresh);
      const fontReady = document.fonts?.ready.then(refresh);
      const pendingImages = Array.from(root.querySelectorAll("img")).filter((img) => !img.complete);
      pendingImages.forEach((img) => img.addEventListener("load", refresh, { once: true }));

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
        void fontReady;
        pendingImages.forEach((img) => img.removeEventListener("load", refresh));
        media.revert();
      };
    },
    { scope, dependencies: [routeKey], revertOnUpdate: true },
  );

  return <div ref={scope} className="route-frame">{children}</div>;
}
