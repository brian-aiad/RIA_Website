import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gold-400 shadow-[0_1px_10px_rgba(245,158,11,0.35)]"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
