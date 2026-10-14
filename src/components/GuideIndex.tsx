import { useEffect, useState } from "react";

const chapters = [
  ["orientation", "What to know"],
  ["anatomy", "What coverage may include"],
  ["documents", "What to have ready"],
  ["fine-print", "A practical note"],
  ["answers", "Common questions"],
] as const;

export default function GuideIndex() {
  const [active, setActive] = useState<string>(chapters[0][0]);
  useEffect(() => {
    const elements = chapters.map(([id]) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = Math.max(120, window.innerHeight * .25);
      const current = [...elements].reverse().find(element => element.getBoundingClientRect().top <= line);
      setActive(current?.id ?? chapters[0][0]);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <aside className="brief-index motion-reveal">
      <span>On this page</span>
      <nav className="guide-index" aria-label="Coverage guide chapters">
        {chapters.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setActive(id)} aria-current={active === id ? "location" : undefined}>{label}</a>)}
      </nav>
    </aside>
  );
}
