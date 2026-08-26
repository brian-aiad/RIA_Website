import { type ReactNode } from "react";

type Tone = "light" | "offwhite" | "dark" | "accent";
type Padding = "default" | "compact" | "none";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: Tone;
  padding?: Padding;
  as?: "section" | "div" | "article";
}

const toneClasses: Record<Tone, string> = {
  light:    "bg-white",
  offwhite: "bg-slate-50",
  dark:     "bg-brand-950 text-white",
  accent:   "hero-mesh",
};

const paddingClasses: Record<Padding, string> = {
  default: "sp",
  compact: "sp-sm",
  none:    "",
};

/**
 * Standard section wrapper. Every page section uses this component for
 * consistent background, padding, and max-width.
 *
 * Usage:
 *   <Section tone="offwhite">
 *     <div className="container">...</div>
 *   </Section>
 */
export function Section({ children, className = "", id, tone = "light", padding = "default", as: Tag = "section" }: SectionProps) {
  return (
    <Tag
      id={id}
      className={`${toneClasses[tone]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </Tag>
  );
}
