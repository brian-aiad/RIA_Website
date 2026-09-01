import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    const routeChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    const frame = window.requestAnimationFrame(() => {
      const main = document.getElementById("main-content");
      main?.setAttribute("tabindex", "-1");

      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          if (!target.matches("a, button, input, select, textarea, [tabindex]")) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: "start" });
        }
        return;
      }

      if (routeChanged) main?.focus({ preventScroll: true });
    });

    if (hash) return () => window.cancelAnimationFrame(frame);

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
