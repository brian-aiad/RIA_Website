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
      // Reduced-motion users keep native, immediate rendering. Touch devices
      // receive only small, one-time transforms; no scroll scrubbing or pinning.
      root.classList.remove("motion-managed");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const isCompact = window.matchMedia("(max-width: 959px), (pointer: coarse)").matches;

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
                x: (step.x ?? 0) * (isCompact ? 0.45 : 1),
                y: (step.y ?? 0) * (isCompact ? 0.45 : 1),
                scale: isCompact && step.scale ? 1 - ((1 - step.scale) * 0.45) : (step.scale ?? 1),
              });
            });

            const timeline = gsap.timeline({
              scrollTrigger: { trigger: group, start, once: true, fastScrollEnd: true },
              defaults: { ease: "power3.out", overwrite: "auto" },
            });

            prepared.forEach(({ step, targets }) => {
              timeline
                .set(targets, { willChange: "transform" }, step.at ?? ">")
                .to(targets, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: isCompact ? Math.min(step.duration ?? 0.5, 0.42) : (step.duration ?? 0.5),
                  stagger: isCompact ? Math.min(step.stagger ?? 0, 0.025) : (step.stagger ?? 0),
                  clearProps: "transform,willChange",
                }, "<");
            });
          });
        };

        // Homepage: each band has its own short, editorially meaningful beat.
        stageGroup(".ria-service-strip", [{ selector: "a", y: 8, duration: 0.36, stagger: 0.035 }], "clamp(top 92%)");
        stageGroup(".brokerage-path", [
          { selector: ".brokerage-path__heading > div", x: -14, duration: 0.58 },
          { selector: ".brokerage-path__support", x: 14, duration: 0.54, at: "-=0.42" },
          { selector: ".brokerage-path__step", y: 12, duration: 0.48, stagger: 0.06, at: "-=0.3" },
          { selector: ".brokerage-path__roles", y: 10, duration: 0.5, at: "-=0.3" },
        ], "clamp(top 90%)");
        stageGroup(".coverage-motion", [
          { selector: ".coverage-motion__heading > div", x: -14, duration: 0.58 },
          { selector: ".coverage-motion__heading > p", x: 14, duration: 0.54, at: "-=0.44" },
          { selector: ".coverage-motion__scene", y: 14, scale: 0.995, duration: 0.54, stagger: 0.065, at: "-=0.3" },
          { selector: ".coverage-motion__disclosure", y: 8, duration: 0.38, at: "-=0.28" },
        ], "clamp(top 88%)");
        stageGroup(".ria-coverage", [
          { selector: ".ria-section-heading", y: 10, duration: 0.48 },
          { selector: ".coverage-desk", y: 14, scale: 0.995, duration: 0.58, at: "-=0.34" },
        ]);
        stageGroup(".broker-cases", [
          { selector: ".broker-cases__heading > div", x: -14, duration: 0.56 },
          { selector: ".broker-cases__heading > p", x: 14, duration: 0.52, at: "-=0.42" },
          { selector: ".broker-cases__shell", y: 12, scale: 0.996, duration: 0.58, at: "-=0.32" },
        ]);
        stageGroup(".ria-editorial", [
          { selector: ".ria-section-heading", y: 10, duration: 0.48 },
          { selector: ".ria-editorial__grid > .ria-story", y: 14, scale: 0.995, duration: 0.52, stagger: 0.065, at: "-=0.28" },
        ]);
        stageGroup(".ria-local", [
          { selector: ".ria-local__copy", x: -14, duration: 0.58 },
          { selector: ".ria-local__portfolio", x: 14, duration: 0.58, at: "-=0.46" },
        ]);
        stageGroup(".ria-reviews", [
          { selector: ".ria-reviews__heading > div:first-child", x: -14, duration: 0.56 },
          { selector: ".ria-reviews__score", x: 14, duration: 0.54, at: "-=0.44" },
          { selector: ".ria-reviews__ledger > blockquote", y: 12, scale: 0.996, duration: 0.5, stagger: 0.055, at: "-=0.3" },
          { selector: ".ria-reviews__note", y: 8, duration: 0.38, at: "-=0.3" },
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
        stageGroup(".scope-note", [
          { selector: ".scope-note__intro", x: -12, duration: 0.54 },
          { selector: ".paper-note", y: 12, duration: 0.5, stagger: 0.08, at: "-=0.38" },
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
        stageGroup(".planning-note", [
          { selector: ".planning-note__copy", x: -10, duration: 0.48 },
          { selector: ".planning-note__documents > li", x: 10, duration: 0.42, stagger: 0.055, at: "-=0.34" },
        ], "clamp(top 91%)");
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
        stageGroup(".policy-file__body article > section", [{ selector: ":scope > h2, :scope > p, :scope > ul", x: 8, duration: 0.42, stagger: 0.035 }], "clamp(top 90%)");

        root.querySelectorAll<HTMLElement>(".quote-band").forEach((band) => {
          if (band.getBoundingClientRect().top < window.innerHeight + 24) return;
          const targets = Array.from(band.querySelectorAll<HTMLElement>(".quote-band__art img, .quote-band__mark, h2, .quote-band__grid > p, .quote-band__actions"));
          gsap.set(targets, { y: 10, willChange: "transform" });
          gsap.to(targets, {
            y: 0,
            duration: 0.44,
            stagger: 0.045,
            ease: "power3.out",
            clearProps: "transform,willChange",
            scrollTrigger: { trigger: band, start: "clamp(top 88%)", once: true, fastScrollEnd: true },
          });
        });

        // The homepage's primary scroll-linked narrative: the gold route follows
        // the actual work of an independent broker from brief to service.
        if (!isCompact) root.querySelectorAll<HTMLElement>("[data-brokerage-path]").forEach((rail) => {
          const track = rail.querySelector<HTMLElement>(".brokerage-path__track span");
          const nodes = Array.from(rail.querySelectorAll<HTMLElement>(".brokerage-path__node"));
          if (!track || !nodes.length) return;

          gsap.set(track, { scaleX: 0, transformOrigin: "left center", willChange: "transform" });
          gsap.set(nodes, { scale: 0.78, transformOrigin: "center" });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: rail,
              start: "clamp(top 82%)",
              end: "clamp(bottom 58%)",
              scrub: 0.55,
            },
          });
          timeline.to(track, { scaleX: 1, duration: 1, ease: "none" }, 0)
            .to(nodes, {
              scale: 1,
              duration: 0.12,
              stagger: 0.22,
              ease: "back.out(1.5)",
            }, 0.02);
        });

        // The day's gold rule advances with the reader, connecting auto, home,
        // and business as one insurance narrative without moving the page itself.
        if (!isCompact) root.querySelectorAll<HTMLElement>("[data-coverage-motion]").forEach((section) => {
          const track = section.querySelector<HTMLElement>(".coverage-motion__progress > span");
          const nodes = Array.from(section.querySelectorAll<HTMLElement>(".coverage-motion__progress > i"));
          if (!track || !nodes.length) return;

          gsap.set(track, { scaleX: 0, transformOrigin: "left center", willChange: "transform" });
          gsap.set(nodes, { scale: 0.62, transformOrigin: "center" });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "clamp(top 78%)",
              end: "clamp(bottom 54%)",
              scrub: 0.5,
            },
          });
          timeline.to(track, { scaleX: 1, duration: 1, ease: "none" }, 0)
            .to(nodes, { scale: 1, duration: 0.14, stagger: 0.3, ease: "back.out(1.45)" }, 0.04);
        });

        // The illustration moves inside its printed frame while the opening
        // brief leaves the viewport. Caption, frame, and layout stay fixed.
        if (!isCompact) root.querySelectorAll<HTMLElement>("[data-dossier-hero]").forEach((hero) => {
          const media = hero.querySelector<HTMLElement>(".dossier-hero__media");
          if (!media) return;
          gsap.fromTo(media,
            { yPercent: -0.7, scale: 1.02, transformOrigin: "center", willChange: "transform" },
            {
              yPercent: 0.9,
              scale: 1.045,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.65 },
            },
          );
        });

        // Small pieces of the print identity arrive as the reader reaches them.
        // These transform-only cues work across interior pages without fading copy.
        root.querySelectorAll<HTMLElement>(".atlas-eyebrow > span").forEach((rule) => {
          if (rule.getBoundingClientRect().top < window.innerHeight + 24) return;
          gsap.fromTo(rule,
            { scaleX: 0.05, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.52,
              ease: "power2.out",
              clearProps: "transform,willChange",
              scrollTrigger: { trigger: rule, start: "clamp(top 90%)", once: true },
            },
          );
        });

        root.querySelectorAll<HTMLElement>(".section-folio").forEach((folio) => {
          if (folio.getBoundingClientRect().top < window.innerHeight + 24) return;
          const dot = folio.querySelector<HTMLElement>("i");
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: folio.parentElement ?? folio, start: "clamp(top 92%)", once: true },
            defaults: { ease: "power3.out" },
          });
          timeline.fromTo(folio,
            { x: isCompact ? 6 : 10, willChange: "transform" },
            { x: 0, duration: isCompact ? 0.34 : 0.44, clearProps: "transform,willChange" },
          );
          if (dot) timeline.fromTo(dot,
            { scale: 0.2, transformOrigin: "center" },
            { scale: 1, duration: 0.28, ease: "back.out(1.8)", clearProps: "transform" },
            "-=0.2",
          );
        });

        // Documentary photos settle gently into their frames. No opacity or
        // layout properties are animated, so content stays stable while scrolling.
        root.querySelectorAll<HTMLElement>(
          ".ria-story__photo:not(.atlas-image--illustrated), .agency-team__visual img:not(.atlas-image--illustrated), .office-record__photo img:not(.atlas-image--illustrated), .contact-desk__photo img:not(.atlas-image--illustrated), .service-ledger__image--photo img:not(.atlas-image--illustrated)",
        ).forEach((photo) => {
          if (photo.getBoundingClientRect().top < window.innerHeight + 24) return;
          gsap.fromTo(photo,
            { scale: 1.025, transformOrigin: "center" },
            {
              scale: 1,
              duration: 0.72,
              ease: "power2.out",
              clearProps: "transform,willChange",
              scrollTrigger: { trigger: photo, start: "clamp(top 88%)", once: true },
            },
          );
        });

        // Stable, insurance-specific drawings reveal only when encountered.
        if (!isCompact) root.querySelectorAll<SVGSVGElement>(".ria-story__drawing, .brief-closing-image__drawing, .service-ledger__image--drawing .coverage-linework").forEach((drawing) => {
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
        if (!isCompact) root.querySelectorAll<HTMLElement>(".westside-map").forEach((map) => {
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
        if (!isCompact) root.querySelectorAll<HTMLElement>(".ria-local__backdrop, .brief-closing-image__inner > img").forEach((photo) => {
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

        // Commissioned scenes arrive like printed plates settling into place.
        // The cue is small on phones and transform-only at every breakpoint.
        root.querySelectorAll<HTMLElement>(".atlas-image--illustrated").forEach((art, index) => {
          if (art.closest(".ria-hero__office") || art.getBoundingClientRect().top < window.innerHeight + 24) return;
          gsap.fromTo(art,
            {
              scale: isCompact ? 1.018 : 1.04,
              xPercent: isCompact ? 0 : (index % 2 === 0 ? -0.65 : 0.65),
              transformOrigin: "center",
            },
            {
              scale: 1,
              xPercent: 0,
              duration: isCompact ? 0.5 : 0.78,
              ease: "power3.out",
              clearProps: "transform,willChange",
              scrollTrigger: {
                trigger: art,
                start: "clamp(top 89%)",
                once: true,
                fastScrollEnd: true,
              },
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
