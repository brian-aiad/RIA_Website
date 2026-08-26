export function Counter({
  to,
  suffix = "",
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  return <span className={className}>{to}{suffix}</span>;
}
