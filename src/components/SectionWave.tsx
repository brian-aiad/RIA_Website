/** Organic SVG wave separator between sections of different background colors */
export function SectionWave({
  fill = "#f8fafc",
  flip = false,
  variant = 1,
  className = "",
}: {
  /** Fill color — should match the NEXT section's background */
  fill?: string;
  /** Flip vertically to create a rising wave instead of dropping */
  flip?: boolean;
  variant?: 1 | 2 | 3;
  className?: string;
}) {
  const paths: Record<1 | 2 | 3, string> = {
    1: "M0 52H1440V28C1200 50 960 8 720 28C480 48 240 6 0 28V52Z",
    2: "M0 52H1440V18C1350 46 1100 4 880 22C660 40 440 2 200 20L0 30V52Z",
    3: "M0 52H1440V32C1360 52 1180 14 960 28C740 42 480 8 260 26C130 38 50 20 0 32V52Z",
  };

  return (
    <div
      className={`pointer-events-none select-none leading-[0] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{
          height: "52px",
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}
