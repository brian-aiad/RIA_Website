import type { ReactNode } from "react";
import { Reveal } from "./AnimatedSection";

interface ConsultationImageProps {
  image: string;
  alt: string;
  eyebrow?: string;
  heading: string;
  body: ReactNode;
  badge?: string;
  stats?: Array<{ value: string; label: string }>;
  /** Put image on the left column (default: right) */
  imageLeft?: boolean;
}

/**
 * Split layout: consultation photo on one side, keyword-rich heading + prose on the other.
 * Used on money pages to break up text-only sections with real imagery.
 * Both sides reveal from opposite directions on scroll.
 */
export function ConsultationImage({
  image,
  alt,
  eyebrow,
  heading,
  body,
  badge,
  stats,
  imageLeft = false,
}: ConsultationImageProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* ─── Image column ─── */}
      <Reveal
        direction={imageLeft ? "left" : "right"}
        className={imageLeft ? "" : "lg:order-last"}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-heavy group">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Bottom gradient for badge legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(6,14,31,0.48) 0%, transparent 55%)",
            }}
          />
          {badge && (
            <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-bold text-brand-800 shadow-soft">
              {badge}
            </span>
          )}
          {/* Gold corner accent */}
          <div
            className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl pointer-events-none"
            style={{ background: "rgba(245,158,11,0.1)" }}
            aria-hidden="true"
          />
        </div>

        {stats && stats.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center rounded-xl bg-white ring-1 ring-slate-200 shadow-xs py-3 px-2"
              >
                <div
                  className="text-lg font-extrabold text-brand-800 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </Reveal>

      {/* ─── Content column ─── */}
      <Reveal direction={imageLeft ? "right" : "left"}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2
          className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {heading}
        </h2>
        <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
          {body}
        </div>
      </Reveal>
    </div>
  );
}
