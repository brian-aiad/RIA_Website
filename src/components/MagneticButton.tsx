import { useRef, type ComponentPropsWithoutRef, type ElementType, type MouseEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "button" | "a" | "div";
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  strength = 0.3,
  ...props
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Component = Tag as ElementType;

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      {...(props as ComponentPropsWithoutRef<typeof Component>)}
    >
      {children}
    </Component>
  );
}
