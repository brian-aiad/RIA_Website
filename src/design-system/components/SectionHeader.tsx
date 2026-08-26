import { type ReactNode } from "react";
import { RevealOnScroll } from "./RevealOnScroll";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

/**
 * Standard section header: eyebrow label + h2 + optional lede paragraph.
 * Every section that has a heading uses this component — no exceptions.
 *
 * Usage:
 *   <SectionHeader
 *     eyebrow="Why Rafla Insurance"
 *     title="Local service backed by over two decades"
 *     lede="We shop multiple carriers so you get the best fit."
 *   />
 */
export function SectionHeader({ eyebrow, title, lede, align = "left", className = "", dark = false }: SectionHeaderProps) {
  const centerClass = align === "center" ? "text-center mx-auto" : "";
  const textColor = dark ? "text-white" : "text-slate-900";
  const ledeColor = dark ? "text-white/80" : "text-slate-500";

  return (
    <RevealOnScroll className={`max-w-2xl ${centerClass} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow mb-3 ${dark ? "eyebrow-light" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`display-2 ${textColor}`}>{title}</h2>
      {lede && (
        <p className={`mt-3 ${ledeColor} leading-relaxed`}>{lede}</p>
      )}
    </RevealOnScroll>
  );
}

/**
 * Lightweight inline eyebrow label. Use instead of ad-hoc `<span className="eyebrow">`.
 */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>
      {children}
    </span>
  );
}
