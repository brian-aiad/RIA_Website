import { site } from "../../lib/site";

export default function ReviewBadge({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={site.reviews.googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/95 text-slate-700 shadow-sm transition hover:shadow-md ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
      aria-label="Read Rafla Insurance Agency reviews on Google"
    >
      <svg className="h-4 w-4 text-gold-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" /></svg>
      <span className="font-semibold">Read our Google reviews</span>
    </a>
  );
}
