import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

type HeadingItem = {
  id: string;
  label: string;
};

const EXCLUDED_PATHS = new Set(["/"]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 56);
}

export default function SectionNavigator() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [showNavigator, setShowNavigator] = useState(false);

  useEffect(() => {
    if (EXCLUDED_PATHS.has(pathname)) {
      setHeadings([]);
      setShowNavigator(false);
      return;
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main section:not(.page-hero) h2"))
      .filter((node) => node.textContent && !node.closest("[aria-hidden='true']"));

    const next = nodes.slice(0, 8).map((node, index) => {
      const label = node.textContent?.trim() ?? `Section ${index + 1}`;
      if (!node.id) {
        const base = slugify(label) || `section-${index + 1}`;
        node.id = `${base}-${index + 1}`;
      }
      node.classList.add("scroll-mt-28");
      return { id: node.id, label };
    });

    setHeadings(next);
    setActiveId(next[0]?.id ?? "");
    setShowNavigator(false);

    if (next.length < 3) return;

    const updateVisibility = () => {
      const firstSectionTop = nodes[0]?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      setShowNavigator(firstSectionTop < window.innerHeight * 0.75);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    nodes.forEach((node) => observer.observe(node));
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  const activeLabel = useMemo(
    () => headings.find((heading) => heading.id === activeId)?.label ?? headings[0]?.label,
    [activeId, headings]
  );

  if (headings.length < 3 || !showNavigator) return null;

  return (
    <>
      <aside className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 min-[1900px]:block">
        <div className="pointer-events-auto w-44 rounded-2xl bg-white/90 p-3 shadow-lifted ring-1 ring-slate-200/80 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between gap-3 px-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">On This Page</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          </div>
          <nav className="space-y-1">
            {headings.map((heading) => {
              const active = activeId === heading.id;
              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block rounded-xl px-2.5 py-2 text-[12px] font-semibold leading-snug transition-all ${
                    active
                      ? "bg-brand-50 text-brand-800 ring-1 ring-brand-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {heading.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full origin-left rounded-full bg-gold-400" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-3 z-30 px-3 sm:hidden">
        <a
          href={`#${activeId || headings[0].id}`}
          className="mx-auto flex max-w-[22rem] items-center justify-between gap-3 rounded-full bg-brand-950/[0.92] px-4 py-2.5 text-white shadow-heavy ring-1 ring-white/10 backdrop-blur-xl"
        >
          <span className="min-w-0 truncate text-[12px] font-semibold">{activeLabel}</span>
          <span className="h-1.5 w-12 overflow-hidden rounded-full bg-white/15">
            <span className="block h-full origin-left rounded-full bg-gold-400" style={{ transform: `scaleX(${progress})` }} />
          </span>
        </a>
      </div>
    </>
  );
}
