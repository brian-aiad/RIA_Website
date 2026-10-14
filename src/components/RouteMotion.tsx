import { useEffect, useRef, useState, type ReactNode } from "react";

type MotionStep = {
  selector: string;
  x?: number;
  y?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  duration?: number;
  stagger?: number;
};

/**
 * Motion follows the agency's printed-file idea: one composed entrance per
 * section, individual records arriving as they enter view, and framed photo
 * movements. It never owns scrolling and never hides meaningful content.
 */
export default function RouteMotion({ children, routeKey }: { children: ReactNode; routeKey: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [compactMotion, setCompactMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 959px), (pointer: coarse)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 959px), (pointer: coarse)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateCompact = () => setCompactMotion(compact.matches);
    preference.addEventListener("change", updatePreference);
    compact.addEventListener("change", updateCompact);
    return () => {
      preference.removeEventListener("change", updatePreference);
      compact.removeEventListener("change", updateCompact);
    };
  }, []);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    const setupMotion = async () => {
      // Reduced-motion users keep native, immediate rendering. Touch devices
      // receive only small, one-time transforms; no scroll scrubbing or pinning.
      root.classList.remove("motion-managed");
      if (reducedMotion) return;
      const isCompact = compactMotion;

      const modules = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]).catch(() => null);
      if (cancelled || !modules) return;
      const [{ default: gsap }, { ScrollTrigger }] = modules;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
      root.classList.add("motion-managed");
      root.dataset.motionState = "ready";
      const entrances = new WeakMap<Element, gsap.core.Tween>();

      const context = gsap.context(() => {
        const progress = root.querySelector<HTMLElement>(".page-scroll-progress");
        if (progress && !isCompact) gsap.fromTo(progress, { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        });
        const stageGroup = (groupSelector: string, steps: MotionStep[], start = "clamp(top 86%)") => {
          root.querySelectorAll<HTMLElement>(groupSelector).forEach((group) => {
            // Motion is enhancement only. Anything already in or above the
            // viewport stays untouched, which protects hash links and captures.
            const prepared = steps
              .map((step) => ({ step, targets: Array.from(group.querySelectorAll<HTMLElement>(step.selector)).filter(target => target.getBoundingClientRect().top >= window.innerHeight + 24) }))
              .filter(({ targets }) => targets.length);
            if (!prepared.length) return;

            prepared.forEach(({ step, targets }) => {
              gsap.set(targets, {
                x: (step.x ?? 0) * (isCompact ? 0.65 : 1.5),
                y: (step.y ?? 0) * (isCompact ? 0.85 : 1.8),
                ...(step.scale === undefined ? {} : {
                  scale: isCompact ? 1 - ((1 - step.scale) * 0.45) : step.scale,
                }),
                ...(step.scaleX === undefined ? {} : {
                  scaleX: isCompact ? 1 - ((1 - step.scaleX) * 0.45) : step.scaleX,
                }),
                ...(step.scaleY === undefined ? {} : {
                  scaleY: isCompact ? 1 - ((1 - step.scaleY) * 0.45) : step.scaleY,
                }),
              });
            });

            prepared.forEach(({ step, targets }) => {
              const destination = {
                x: 0,
                y: 0,
                ...(step.scale === undefined ? {} : { scale: 1 }),
                ...(step.scaleX === undefined ? {} : { scaleX: 1 }),
                ...(step.scaleY === undefined ? {} : { scaleY: 1 }),
                duration: isCompact ? Math.min(step.duration ?? 0.5, 0.5) : (step.duration ?? 0.5) * 1.25,
                clearProps: "transform",
              };
              // Each block waits for its own entrance, including paired copy
              // that becomes a separate row on mobile. Stagger same-row items.
                const tops = targets.map(target => target.getBoundingClientRect().top);
                targets.forEach((target, index) => {
                  const rowIndex = tops.slice(0, index).filter(top => Math.abs(top - tops[index]) < 5).length;
                  const entrance = gsap.to(target, {
                    ...destination,
                    ease: "power3.out",
                    delay: isCompact ? 0 : Math.min(rowIndex * (step.stagger ?? .05), .15),
                    scrollTrigger: {
                      trigger: target,
                      // Links must finish arriving as soon as they are visible,
                      // including short cards at the bottom of the viewport.
                      start: target.matches("a, button, [role=tab]") ? "clamp(top 98%)" : start,
                      once: true,
                      fastScrollEnd: true,
                    },
                  });
                  entrances.set(target, entrance);
                });
            });
          });
        };

        // These hooks belong only to authored decorative details. Text, fields,
        // and navigation are never hidden while a drawing registers into place.
        const decorativeStart = (target: Element) => ({
          trigger: target,
          start: "clamp(top 92%)",
          once: true,
          fastScrollEnd: true,
        });
        const isUpcoming = (target: Element) => target.getClientRects().length > 0
          && target.getBoundingClientRect().top >= window.innerHeight + 24;
        root.querySelectorAll<HTMLElement | SVGElement>("[data-register-line]").forEach((line) => {
          if (!isUpcoming(line)) return;
          if (line instanceof SVGGeometryElement) {
            const length = line.getTotalLength();
            if (!Number.isFinite(length) || length < 1) return;
            gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, {
              strokeDashoffset: 0,
              duration: isCompact ? .48 : .85,
              ease: "power2.inOut",
              clearProps: "strokeDasharray,strokeDashoffset",
              scrollTrigger: decorativeStart(line),
            });
          } else {
            gsap.fromTo(line, { scaleX: .08, transformOrigin: "left center" }, {
              scaleX: 1, duration: isCompact ? .4 : .65, ease: "power3.out",
              clearProps: "transform,transformOrigin", scrollTrigger: decorativeStart(line),
            });
          }
        });
        root.querySelectorAll<HTMLElement | SVGElement>("[data-register-mark]").forEach((mark) => {
          if (!isUpcoming(mark)) return;
          gsap.fromTo(mark, { scale: .9, rotation: -2, transformOrigin: "center" }, {
            scale: 1, rotation: 0, duration: isCompact ? .35 : .55, ease: "power3.out",
            clearProps: "transform,transformOrigin", scrollTrigger: decorativeStart(mark),
          });
        });
        root.querySelectorAll<HTMLElement>("[data-document-tab]").forEach((tab) => {
          if (!isUpcoming(tab)) return;
          gsap.fromTo(tab, { x: isCompact ? -4 : -9 }, {
            x: 0, duration: isCompact ? .3 : .48, ease: "power3.out",
            clearProps: "transform", scrollTrigger: decorativeStart(tab),
          });
        });

        // Homepage: each band has its own short, editorially meaningful beat.
        stageGroup(".ria-service-strip", [{ selector: "a", y: 8, duration: 0.36, stagger: 0.035 }], "clamp(top 92%)");
        stageGroup(".broker-cases", [
          { selector: ".broker-cases__heading > div", x: -14, duration: 0.56 },
          { selector: ".broker-cases__heading > p", x: 14, duration: 0.52 },
          { selector: ".broker-cases__shell", y: 12, scale: 0.996, duration: 0.58 },
        ]);
        stageGroup(".ria-editorial", [
          { selector: ".ria-section-heading", y: 10, duration: 0.48 },
          { selector: ".ria-editorial__grid > .ria-story", y: 14, scale: 0.995, duration: 0.52, stagger: 0.065 },
        ]);
        stageGroup(".ria-local", [
          { selector: ".ria-local__copy", x: -14, duration: 0.58 },
          { selector: ".ria-local__portfolio", x: 14, duration: 0.58 },
          { selector: ".ria-local__facts > div", y: 8, duration: 0.4, stagger: 0.04 },
        ]);
        stageGroup(".ria-reviews", [
          { selector: ".ria-reviews__heading > div:first-child", x: -14, duration: 0.56 },
          { selector: ".ria-reviews__score", x: 14, duration: 0.54 },
          { selector: ".ria-reviews__ledger > blockquote", y: 12, scale: 0.996, duration: 0.5, stagger: 0.055 },
          { selector: ".ria-reviews__note", y: 8, duration: 0.38 },
        ]);
        stageGroup(".ria-faq", [
          { selector: ".ria-faq__grid > header", x: -12, duration: 0.5 },
          { selector: ".ria-faq__grid > div > .answer-drawer", x: 8, duration: 0.38, stagger: 0.035 },
        ]);

        // Interior pages: photo/copy pairs, cards, and records each move once.
        stageGroup(".services-ledger", [
          { selector: ".services-ledger__intro", y: 10, duration: 0.5 },
          { selector: ".services-ledger__groups > .service-ledger", y: 14, scale: 0.995, duration: 0.52, stagger: 0.055 },
          { selector: ".service-ledger__number", scale: 0.82, duration: 0.34, stagger: 0.055 },
        ]);
        stageGroup(".services-briefs", [
          { selector: ".services-briefs__copy", x: -12, duration: 0.5 },
          { selector: ".services-briefs__list > a", x: 8, duration: 0.38, stagger: 0.035 },
        ]);
        stageGroup(".agency-story", [
          { selector: ".agency-story__statement", x: -12, duration: 0.5 },
          { selector: ".agency-story__copy", y: 10, duration: 0.5 },
          { selector: ".agency-credential", y: 10, duration: 0.48 },
        ]);
        stageGroup(".agency-principles", [
          { selector: ".agency-principles__heading", y: 10, duration: 0.5 },
          { selector: ".agency-principles__grid > article", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055 },
        ]);
        stageGroup(".agency-team", [
          { selector: ".agency-team__visual", x: -18, duration: 0.62 },
          { selector: ".agency-team__records", x: 16, duration: 0.58 },
        ]);
        stageGroup(".office-record", [
          { selector: ".office-record__photo", x: -18, duration: 0.62 },
          { selector: ".office-record__details", x: 16, duration: 0.58 },
        ]);
        stageGroup(".city-directory", [
          { selector: ".city-directory__heading", y: 10, duration: 0.5 },
          { selector: ".locations-map-plate", scale: 0.99, duration: 0.55 },
          { selector: ".city-directory__grid > .city-record", y: 12, scale: 0.995, duration: 0.46, stagger: 0.045 },
        ]);
        stageGroup(".contact-switchboard", [
          { selector: ".contact-switchboard__heading", y: 10, duration: 0.5 },
          { selector: ".contact-switchboard__grid > *", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055 },
        ]);
        stageGroup(".contact-desk", [
          { selector: ".contact-desk__photo", x: -18, duration: 0.62 },
          { selector: ".contact-desk__hours", x: 16, duration: 0.58 },
        ]);
        stageGroup(".contact-team", [
          { selector: ".contact-team__heading", y: 10, duration: 0.5 },
          { selector: ".contact-team__grid > article", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055 },
        ]);
        stageGroup(".answer-library", [
          { selector: ".answer-library__index", x: -12, duration: 0.5 },
          { selector: ".answer-library__grid > div:last-child", x: 12, duration: 0.55 },
        ]);
        // Search results are live React content. Their native disclosures animate
        // on open; scroll tweens stay on the stable search/index wrapper only.
        stageGroup(".city-orientation", [
          { selector: ".city-orientation__title", x: -12, duration: 0.5 },
          { selector: ".city-orientation__copy", y: 10, duration: 0.5 },
          { selector: ".city-orientation__office", x: 12, duration: 0.5 },
          { selector: ".city-orientation__office > svg", scale: 0.72, duration: 0.3 },
        ]);
        stageGroup(".city-coverage", [
          { selector: ".city-coverage__heading", y: 10, duration: 0.5 },
          { selector: ".city-coverage__grid > a", y: 14, scale: 0.995, duration: 0.5, stagger: 0.055 },
        ]);
        stageGroup(".nearby-files", [
          { selector: ".nearby-files__grid > div:first-child", x: -12, duration: 0.5 },
          { selector: ".nearby-files__grid > div:last-child > a", x: 8, duration: 0.38, stagger: 0.035 },
        ]);

        stageGroup(".quote-request", [{ selector: ".quote-request__layout > header", y: 10, duration: .45 }]);
        stageGroup(".service-scope-note", [{ selector: "p", y: 10, duration: .45 }]);

        // Product briefs retain a reading hierarchy instead of fading every paragraph.
        stageGroup(".fact-rail", [{ selector: ".fact-rail__item", x: 8, duration: 0.38, stagger: 0.035 }], "clamp(top 91%)");
        stageGroup(".brief-reading", [{ selector: ".brief-index", x: -12, duration: 0.5 }]);
        stageGroup(".brief-chapter", [{ selector: "h2", y: 10, duration: 0.48 }], "clamp(top 90%)");
        stageGroup(".brief-anatomy__list", [{ selector: ":scope > article", x: 8, duration: 0.38, stagger: 0.035 }], "clamp(top 90%)");
        stageGroup(".brief-documents", [
          { selector: ".brief-documents__copy", x: -12, duration: 0.5 },
          { selector: ".paper-note", x: 12, duration: 0.5 },
          { selector: ".brief-documents__copy li svg", scale: 0.7, duration: 0.28, stagger: 0.045 },
        ]);
        stageGroup(".brief-faq", [{ selector: ".answer-drawer", x: 8, duration: 0.38, stagger: 0.035 }], "clamp(top 90%)");
        stageGroup(".brief-closing-image", [{ selector: ".brief-closing-image__inner", y: 12, scale: 0.995, duration: 0.58 }]);
        stageGroup(".policy-file__body article > section", [{ selector: ":scope > h2, :scope > p, :scope > ul", x: 8, duration: 0.42, stagger: 0.035 }], "clamp(top 90%)");

        stageGroup(".ria-award", [{ selector: ".ria-award__image, figcaption", y: 18, duration: .7, stagger: .08 }]);

        stageGroup(".ria-reviews", [
          { selector: ".ria-reviews__register", scaleX: 0.02, duration: 0.72 },
        ], "clamp(top 88%)");

        root.querySelectorAll<HTMLElement>(".quote-band").forEach((band) => {
          if (band.getBoundingClientRect().top < window.innerHeight + 24) return;
          const targets = Array.from(band.querySelectorAll<HTMLElement>(".quote-band__copy, .quote-band__actions"));
          gsap.set(targets, { y: 10 });
          gsap.to(targets, {
            y: 0,
            duration: 0.44,
            stagger: 0.045,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: band, start: "clamp(top 88%)", once: true, fastScrollEnd: true },
          });
        });

        // The illustration moves inside its printed frame while the opening
        // brief leaves the viewport. Caption, frame, and layout stay fixed.
        if (!isCompact) root.querySelectorAll<HTMLElement>("[data-dossier-hero]").forEach((hero) => {
          const media = hero.querySelector<HTMLElement>(".dossier-hero__media");
          if (!media) return;
          gsap.fromTo(media,
            { yPercent: -0.7, scale: 1.02, transformOrigin: "center" },
            {
              yPercent: 0.9,
              scale: 1.045,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.65 },
            },
          );
        });

        if (!isCompact) root.querySelectorAll<HTMLElement>(".ria-hero__office > img").forEach((photo) => {
          gsap.fromTo(photo, { scale: 1.035, yPercent: -.5 }, {
            scale: 1.035,
            yPercent: 1,
            ease: "none",
            scrollTrigger: { trigger: photo.parentElement, start: "top top", end: "bottom top", scrub: .6 },
          });
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
              clearProps: "transform",
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
            { x: isCompact ? 6 : 10 },
            { x: 0, duration: isCompact ? 0.34 : 0.44, clearProps: "transform" },
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
            { scale: isCompact ? 1.035 : 1.075, transformOrigin: "center" },
            {
              scale: 1,
              duration: isCompact ? .7 : 1.15,
              ease: "power2.out",
              clearProps: "transform",
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
          const alreadyMotionManaged = art.closest(".ria-hero__office, [data-dossier-hero], .brief-closing-image__inner")
            || art.matches(".ria-local__backdrop");
          if (alreadyMotionManaged || art.getBoundingClientRect().top < window.innerHeight + 24) return;
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
              clearProps: "transform",
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
      let previousHeight = root.getBoundingClientRect().height;
      const scheduleRefresh = () => {
        if (cancelled || document.visibilityState === "hidden") return;
        window.cancelAnimationFrame(refreshFrame);
        refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      // A link that is being pointed at or focused must stop moving immediately.
      // Only complete the owned entrances, never image-depth or ambient timelines.
      const settleInteraction = (event: Event) => {
        const origin = event.target instanceof Element ? event.target : null;
        if (!origin?.closest("a,button,input,select,textarea,summary,[role=tab]")) return;
        for (let node: Element | null = origin; node && node !== root; node = node.parentElement) {
          const entrance = entrances.get(node);
          if (entrance) {
            // Killing with the default revert flag would restore the entrance's
            // start transform just as the visitor focuses the control.
            entrance.scrollTrigger?.kill(false, true);
            entrance.progress(1);
            entrances.delete(node);
          }
        }
      };
      root.addEventListener("focusin", settleInteraction);
      root.addEventListener("pointerover", settleInteraction);
      root.addEventListener("toggle", scheduleRefresh, true);
      document.addEventListener("visibilitychange", scheduleRefresh);
      window.addEventListener("pageshow", scheduleRefresh);
      const resizeObserver = new ResizeObserver(([entry]) => {
        if (Math.abs(entry.contentRect.height - previousHeight) < 1) return;
        previousHeight = entry.contentRect.height;
        scheduleRefresh();
      });
      resizeObserver.observe(root);
      void document.fonts?.ready.then(() => {
        if (!cancelled) scheduleRefresh();
      });

      teardown = () => {
        window.cancelAnimationFrame(refreshFrame);
        root.removeEventListener("toggle", scheduleRefresh, true);
        root.removeEventListener("focusin", settleInteraction);
        root.removeEventListener("pointerover", settleInteraction);
        document.removeEventListener("visibilitychange", scheduleRefresh);
        window.removeEventListener("pageshow", scheduleRefresh);
        resizeObserver.disconnect();
        root.classList.remove("motion-managed");
        delete root.dataset.motionState;
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
  }, [routeKey, reducedMotion, compactMotion]);

  return <div ref={scope} className="route-frame"><div className="page-scroll-progress" aria-hidden="true" />{children}</div>;
}
