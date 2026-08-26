import { type ReactNode } from "react";

type CardVariant = "default" | "elevated" | "bordered" | "glass" | "dark";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

const variantClasses: Record<CardVariant, string> = {
  default:  "bg-white ring-1 ring-slate-200/80 shadow-soft",
  elevated: "bg-white shadow-lifted ring-1 ring-slate-100",
  bordered: "bg-white border border-slate-200",
  glass:    "bg-white/10 backdrop-blur-md ring-1 ring-white/20",
  dark:     "bg-brand-900 ring-1 ring-brand-800",
};

const hoverClass = "hover:shadow-lifted hover:-translate-y-1 hover:ring-brand-200 transition-all duration-[280ms]";

/**
 * Standard card component. Replaces all ad-hoc card markup across the site.
 *
 * Usage:
 *   <Card variant="default" hover>
 *     <h3>Card title</h3>
 *   </Card>
 */
export function Card({ children, className = "", variant = "default", hover = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={`rounded-2xl p-6 ${variantClasses[variant]} ${hover ? hoverClass : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
