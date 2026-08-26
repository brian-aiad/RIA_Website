type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "figure";
}) {
  return <Tag className={`reveal-surface ${className}`}>{children}</Tag>;
}

export function Stagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function StaggerChild({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reveal-surface ${className}`}>{children}</div>;
}
