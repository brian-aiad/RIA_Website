import { useEffect, useRef, type ReactNode } from "react";

type MotionStep = {
  selector: string;
  x?: number;
  y?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  at?: number | string;
};

/**
 * Motion follows the agency's printed-file idea: one composed entrance per
 * section, a few line drawings revealed at the moment they are read, and two
 * restrained photo moves. It never owns scrolling and never hides content.
 */
export default function RouteMotion({ children, routeKey }: { children: ReactNode; routeKey: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    const setupMotion = async () => {
      // Phones, touch-first tablets, and reduced-motion users keep native,
      // immediate rendering. The document remains fully composed without JS.
      root.classList.remove("motion-managed");
      if (window.matchMedia("(max-width: 959px), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
      root.classList.add("motion-managed");

      const context = gsap.context(() => {
        const stageGroup = (groupSelector: string, steps: MotionStep[], start = "clamp(top 86%)") => {
          root.querySelectorAll<HTMLElement>(groupSelector).forEach((group) => {
            // Motion is enhancement only. Anything already in or above the
            // viewport stays untouched, which protects hash links and captures.
            if (group.getBoundingClientRect().top < window.innerHeight + 24) return;

            const prepared = steps
              .map((step) => ({ step, targets: Array.from(group.querySelectorAll<HTMLElement>(step.selector)) }))
              .filter(({ targets }) => targets.length);
            if (!prepared.length) return;

            prepared.forEach(({ step, targets }) => {
              gsap.set(targets, {
                opacity: 0.94,
                x: step.x ?? 0,
                y: step.y ?? 0,
                scale: step.scale ?? 1,
              });
            });

            const timeline = gsap.timeline({
              scrollTrigger: { trigger: group, start, once: true },
              defaults: { ease: "power3.out", overwrite: "auto" },
            });

            prepared.forEach(({ step, targets }) => {
              timeline
                .set(targets, { willChange: "transform,opacity" }, step.at ?? ">")
                .to(targets, {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: step.duration ?? 0.5,
                  stagger: step.stagger ?? 0,
                  clearProps: "opacity,transform,willChange",
                }, "<");
            });
          });
        };

        // Homepage: each band has its own short, editorially meaningful beat.
        stageGroup(".ria-service-strip", [{ selector: "a", y: 8, duration: 0.36, stagger: 0.035 }], "clamp(top 92%)");
        stageGroup(".ria-coverage", [
          { selector: ".ria-section-heading", y: 10, duration: 0.48 },
          { selector: ".coverage-desk", y: 14, scale: 0.995, duration: 0.58, at: "-=0.34" },
        ]);
        stageGroup(".ria-review", [
          { selector: ".ria-review__image", x: -18, duration: 0.62 },
          { selector: ".ria-review__copy", x: 16, duration: 0.58, at: "-=0.48" },
        ]);
        stageGroup(".ria-editorial", [
          { selector: ".ria-section-heading", y: 10, duration: 0.48 },
          { selector: ".ria-editorial__grid > .ria-story", y: 14, scale: 0.995, duration: 0.52, stagger: 0.065, at: "-=0.28" },
        ]);
        stageGroup(".ria-local", [
          { selector: ".ria-local__copy", x: -14, duration: 0.58 },
          { selector: ".ria-local__portfolio", x: 14, duration: 0.58, at: "-=0.46" },
        ]);
        stageGroup(".ria-faq", [
          { selector: ".ria-faq__grid > header", x: -12, duration: 0.5 },
          { selector: ".ria-faq__grid > div > .answer-drawer", x: 8, duration: 0.38, stagger: 0.035, at: "-=0.34" },
        ]);

        // Interior pages: photo/copy pairs, cards, and records each move once.
        stageGroup(".services-ledger", [
          { selector: ".services-ledger__intro", y: 10, duration: 0.5 },
          { selector: ".services-ledger__groups > .service-ledger", y: 14, scale: 0.995, duration: 0.52, stagger: 0.055, at: "-=0.25" },
        ]);
        stageGroup(".services-briefs", [
          { selector: ".services-briefs__copy", x: -12, duration: 0.5 },
          { selector: ".services-briefs__list > a", x: 8, duration: 0.38, stagger: 0.035, at: "-=0.34" },
        ]);
        stageGroup(".agency-story", [
          { selector: ".agency-story__statement", x: -12, duration: 0.5 },
          { selector: ".agency-story__copy", y: 10, duration: 0.5, at: "-=0.36" },
          { selector: ".agency-story__seal", scale: 0.96, duration: 0.48, at: "-=0.32" },
        ]);
        stageGroup(".agency-principles", [
          { selector: ".agency-principles__heading", y: 10, duration: 0.5 },
          { selector: ".agency-principles__grid > article", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055, at: "-=0.3" },
        ]);
        stageGroup(".agency-team", [
          { selector: ".agency-team__visual", x: -18, duration: 0.62 },
          { selector: ".agency-team__records", x: 16, duration: 0.58, at: "-=0.48" },
        ]);
        stageGroup(".office-record", [
          { selector: ".office-record__photo", x: -18, duration: 0.62 },
          { selector: ".office-record__details", x: 16, duration: 0.58, at: "-=0.48" },
        ]);
        stageGroup(".city-directory", [
          { selector: ".city-directory__heading", y: 10, duration: 0.5 },
          { selector: ".locations-map-plate", scale: 0.99, duration: 0.55, at: "-=0.32" },
          { selector: ".city-directory__grid > .city-record", y: 12, scale: 0.995, duration: 0.46, stagger: 0.045, at: "-=0.32" },
        ]);
        stageGroup(".contact-switchboard", [
          { selector: ".contact-switchboard__heading", y: 10, duration: 0.5 },
          { selector: ".contact-switchboard__grid > *", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055, at: "-=0.3" },
        ]);
        stageGroup(".contact-desk", [
          { selector: ".contact-desk__photo", x: -18, duration: 0.62 },
          { selector: ".contact-desk__hours", x: 16, duration: 0.58, at: "-=0.48" },
        ]);
        stageGroup(".contact-team", [
          { selector: ".contact-team__heading", y: 10, duration: 0.5 },
          { selector: ".contact-team__grid > article", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055, at: "-=0.3" },
        ]);
        stageGroup(".answer-library", [
          { selector: ".answer-library__index", x: -12, duration: 0.5 },
          { selector: ".answer-library__grid > div:last-child", x: 12, duration: 0.55, at: "-=0.4" },
        ]);
        stageGroup(".answer-group", [
          { selector: ".answer-group__title", y: 10, duration: 0.46 },
          { selector: ".answer-drawer", x: 8, duration: 0.38, stagger: 0.035, at: "-=0.3" },
        ], "clamp(top 90%)");
        stageGroup(".city-orientation", [
          { selector: ".city-orientation__title", x: -12, duration: 0.5 },
          { selector: ".city-orientation__copy", y: 10, duration: 0.5, at: "-=0.38" },
          { selector: ".city-orientation__office", x: 12, duration: 0.5, at: "-=0.38" },
        ]);
        stageGroup(".city-coverage", [
          { selector: ".city-coverage__heading", y: 10, duration: 0.5 },
          { selector: ".city-coverage__grid > a", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055, at: "-=0.3" },
        ]);
        stageGroup(".nearby-files", [
          { selector: ".nearby-files__grid > div:first-child", x: -12, duration: 0.5 },
          { selector: ".nearby-files__grid > div:last-child > a", x: 8, duration: 0.38, stagger: 0.035, at: "-=0.34" },
        ]);

        // Product briefs retain a reading hierarchy instead of fading every paragraph.
        stageGroup(".fact-rail", [{ selector: ".fact-rail__item", x: 8, duration: 0.38, stagger: 0.035 }], "clamp(top 91%)");
        stageGroup(".brief-reading", [{ selector: ".brief-index", x: -12, duration: 0.5 }]);
        stageGroup(".brief-chapter", [{ selector: "h2", y: 10, duration: 0.48 }], "clamp(top 90%)");
        stageGroup(".brief-anatomy__list", [{ selector: ":scope > article", x: 8, duration: 0.38, stagger: 0.035 }], "clamp(top 90%)");
        stageGroup(".brief-documents", [
          { selector: ".brief-documents__copy", x: -12, duration: 0.5 },
          { selector: ".paper-note", x: 12, duration: 0.5, at: "-=0.38" },
        ]);
        stageGroup(".brief-faq", [{ selector: ".answer-drawer", x: 8, duration: 0.38, stagger: 0.035 }], "clamp(top 90%)");
        stageGroup(".brief-closing-image", [{ selector: ".brief-closing-image__inner", y: 12, scale: 0.995, duration: 0.58 }]);
        stageGroup(".policy-file__body article", [{ selector: ":scope > section", x: 8, duration: 0.42, stagger: 0.04 }], "clamp(top 90%)");

        root.querySelectorAll<HTMLElement>(".quote-band").forEach((band) => {
          if (band.getBoundingClientRect().top < window.innerHeight + 24) return;
          const targets = Array.from(band.querySelectorAll<HTMLElement>(".quote-band__mark, h2, .quote-band__grid > p, .quote-band__actions"));
          gsap.set(targets, { opacity: 0.94, y: 10 });
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.44,
            stagger: 0.045,
            ease: "power3.out",
            clearProps: "opacity,transform,willChange",
            scrollTrigger: { trigger: band, start: "clamp(top 88%)", once: true },
          });
        });

        // Stable, insurance-specific drawings reveal only when encountered.
        root.querySelectorAll<SVGSVGElement>(".ria-story__drawing, .brief-closing-image__drawing, .service-ledger__image--drawing .coverage-linework").forEach((drawing) => {
          const strokes = drawing.querySelectorAll<SVGElement>("path:not(.coverage-linework__grid), circle");
          if (drawing.getBoundingClientRect().top < window.innerHeight + 24) {
            gsap.set(strokes, { strokeDashoffset: 0 });
            return;
          }
          gsap.set(strokes, { strokeDasharray: 1500, strokeDashoffset: 1500 });
          gsap.to(strokes, {
            strokeDashoffset: 0,
            duration: 0.82,
            stagger: 0.025,
            ease: "power1.inOut",
            scrollTrigger: { trigger: drawing, start: "clamp(top 88%)", once: true },
          });
        });

        // The map keeps CSS label positioning intact; only its ink and dots move.
        root.querySelectorAll<HTMLElement>(".westside-map").forEach((map) => {
          if (map.getBoundingClientRect().top < window.innerHeight + 24) return;
          const routes = map.querySelectorAll<SVGPathElement>(".westside-map__route");
          const dots = map.querySelectorAll<HTMLElement>("a i");
          const ring = map.querySelector<SVGCircleElement>(".westside-map__office-ring");
          gsap.set(routes, { strokeDashoffset: 10 });
          gsap.set(dots, { opacity: 0.35, scale: 0.35 });
          if (ring) gsap.set(ring, { opacity: 0.35, scale: 0.65, transformOrigin: "center" });
          const timeline = gsap.timeline({ scrollTrigger: { trigger: map, start: "clamp(top 88%)", once: true } });
          timeline.to(routes, { strokeDashoffset: 0, duration: 0.75, ease: "none" })
            .to(dots, { opacity: 1, scale: 1, duration: 0.32, stagger: 0.035, ease: "back.out(1.8)", clearProps: "opacity,transform" }, "-=0.48");
          if (ring) timeline.to(ring, { opacity: 1, scale: 1, duration: 0.52, ease: "power2.out", clearProps: "opacity,transform" }, "-=0.38");
        });

        // Two quiet, fixed-size photo movements provide depth without hijacking scroll.
        root.querySelectorAll<HTMLElement>(".ria-local__backdrop, .brief-closing-image__inner > img").forEach((photo) => {
          gsap.fromTo(photo,
            { yPercent: -1.5, scale: 1.035 },
            {
              yPercent: 1.5,
              scale: 1.035,
              ease: "none",
              scrollTrigger: { trigger: photo.parentElement ?? photo, start: "top bottom", end: "bottom top", scrub: 0.7 },
            },
          );
        });
      }, root);

      let refreshFrame = 0;
      const scheduleRefresh = () => {
        window.cancelAnimationFrame(refreshFrame);
        refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      root.addEventListener("toggle", scheduleRefresh, true);
      void document.fonts?.ready.then(scheduleRefresh);

      teardown = () => {
        window.cancelAnimationFrame(refreshFrame);
        root.removeEventListener("toggle", scheduleRefresh, true);
        root.classList.remove("motion-managed");
        context.revert();
      };
    };

    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(() => void setupMotion(), { timeout: 1200 })
      : globalThis.setTimeout(() => void setupMotion(), 500);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window && typeof idleId === "number") window.cancelIdleCallback(idleId);
      else if (typeof idleId === "number") globalThis.clearTimeout(idleId);
      teardown?.();
    };
  }, [routeKey]);

  return <div ref={scope} className="route-frame">{children}</div>;
}
