import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function RouteMotion({ children, routeKey }: { children: ReactNode; routeKey: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 900px)",
          pointerFine: "(pointer: fine)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, pointerFine, reduceMotion } = context.conditions as {
            desktop: boolean;
            pointerFine: boolean;
            reduceMotion: boolean;
          };
          const sections = gsap.utils.toArray<HTMLElement>("main section", root);
          const revealSurfaces = gsap.utils.toArray<HTMLElement>(".reveal-surface", root);

          if (reduceMotion) {
            gsap.set([sections, revealSurfaces], { clearProps: "all" });
            return;
          }

          const heroCopy = root.querySelector<HTMLElement>(".hero-copy-enter");
          const heroMedia = root.querySelector<HTMLElement>(".page-hero-media, .home-hero-media");
          const heroAside = root.querySelector<HTMLElement>(".page-hero .hero-aside-enter");

          if (heroCopy) {
            gsap.fromTo(
              Array.from(heroCopy.children),
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.07, clearProps: "transform,opacity,visibility" },
            );
          }

          if (heroMedia) {
            gsap.fromTo(
              heroMedia,
              {
                autoAlpha: 0,
                scale: desktop ? 1.08 : 1.03,
                clipPath: desktop ? "inset(0 0 0 16%)" : "inset(0 0 10% 0)",
              },
              {
                autoAlpha: 1,
                scale: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 1.15,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility,clipPath",
              },
            );
          }

          if (heroAside) {
            gsap.fromTo(
              heroAside,
              { autoAlpha: 0, x: 36, rotationY: -3 },
              { autoAlpha: 1, x: 0, rotationY: 0, duration: 0.9, delay: 0.18, ease: "power3.out", clearProps: "transform,opacity,visibility" },
            );
          }

          sections.forEach((section, index) => {
            if (section.classList.contains("page-hero") || index === 0 && section.closest("main")?.firstElementChild === section) return;

            const content = section.querySelector<HTMLElement>(":scope > .container") ?? section.firstElementChild;
            if (!content) return;

            gsap.fromTo(
              content,
              { opacity: 0, y: desktop ? 46 : 28 },
              {
                opacity: 1,
                y: 0,
                duration: desktop ? 0.9 : 0.7,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: section,
                  start: "top 88%",
                  once: true,
                },
              },
            );

            gsap.fromTo(
              section,
              { "--accent-offset": desktop && index % 2 === 0 ? "-36px" : "36px" },
              {
                "--accent-offset": "0px",
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              },
            );
          });

          ScrollTrigger.batch(revealSurfaces, {
            start: "top 90%",
            once: true,
            interval: 0.08,
            batchMax: desktop ? 4 : 2,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { opacity: 0, y: desktop ? 30 : 18, scale: 0.985 },
                { opacity: 1, y: 0, scale: 1, duration: 0.68, stagger: 0.08, ease: "power3.out", overwrite: true, clearProps: "transform,opacity" },
              ),
          });

          const heroImage = heroMedia?.querySelector("img");
          if (heroImage && desktop) {
            gsap.fromTo(
              heroImage,
              { yPercent: -2 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                  trigger: heroMedia,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }

          if (pointerFine) {
            const hero = root.querySelector<HTMLElement>(".home-hero, .page-hero");
            const moveSpotlight = (event: PointerEvent) => {
              if (!hero) return;
              const rect = hero.getBoundingClientRect();
              hero.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
              hero.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
            };
            hero?.addEventListener("pointermove", moveSpotlight, { passive: true });

            const cards = gsap.utils.toArray<HTMLElement>(".service-card, .card-hover", root);
            const removers = cards.map((card) => {
              card.classList.add("pointer-reactive");
              const onMove = (event: PointerEvent) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
                card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
              };
              card.addEventListener("pointermove", onMove, { passive: true });
              return () => card.removeEventListener("pointermove", onMove);
            });

            return () => {
              hero?.removeEventListener("pointermove", moveSpotlight);
              removers.forEach((remove) => remove());
            };
          }
        },
      );

      window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => media.revert();
    },
    { scope, dependencies: [routeKey], revertOnUpdate: true },
  );

  return <div ref={scope}>{children}</div>;
}
