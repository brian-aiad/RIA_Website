import { type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

/**
 * Standard scroll-entrance animation. Replaces every ad-hoc Framer Motion
 * fadeUp pattern across the site. One pattern everywhere = cohesion.
 *
 * Usage:
 *   <RevealOnScroll>
 *     <h2>Section Heading</h2>
 *   </RevealOnScroll>
 */
export function RevealOnScroll({ children, className, delay = 0, direction = "up" }: RevealOnScrollProps) {
  void delay;
  void direction;
  return <div className={`reveal-surface ${className ?? ""}`}>{children}</div>;
}
