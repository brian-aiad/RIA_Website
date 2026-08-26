import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { openQuoteModal } from "../../lib/openQuote";
import { site } from "../../lib/site";
import { RevealOnScroll } from "./RevealOnScroll";

interface CTASectionProps {
  title?: string;
  lede?: string;
  primaryLabel?: string;
  primaryTo?: string;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryTo?: string;
  note?: ReactNode;
  className?: string;
}

/**
 * Canonical CTA closer — appears at the bottom of every page.
 * One implementation, parameterized. Never create bespoke CTA sections.
 *
 * Usage:
 *   <CTASection
 *     title="Ready to compare multiple carriers?"
 *     lede="Let us compare available options for your situation."
 *   />
 */
export function CTASection({
  title = "Ready to compare coverage?",
  lede = "Get a personalized quote from a licensed Los Angeles broker. Compare in one conversation.",
  primaryLabel = "Get Your Free Quote",
  primaryOnClick,
  secondaryLabel = "Call (310) 572-7246",
  secondaryTo,
  note,
  className = "",
}: CTASectionProps) {
  const handlePrimary = primaryOnClick ?? openQuoteModal;

  return (
    <section className={`sp hero-mesh relative overflow-hidden ${className}`}>
      <div className="container relative text-center">
        <RevealOnScroll>
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {["Licensed CA broker", "Multiple carrier programs", "Call, text, or walk in"].map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/70 ring-1 ring-white/15">
                {item}
              </span>
            ))}
          </div>
          <h2 className="display-2 text-white max-w-2xl mx-auto">{title}</h2>
          {lede && (
            <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">{lede}</p>
          )}

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={handlePrimary}
              className="btn btn-accent btn-lg"
            >
              {primaryLabel}
            </button>

            {secondaryTo ? (
              <NavLink to={secondaryTo} className="btn btn-ghost-light btn-lg">
                {secondaryLabel}
              </NavLink>
            ) : (
              <a href={site.contact.phoneHref} className="btn btn-ghost-light btn-lg">
                {secondaryLabel}
              </a>
            )}
          </div>

          {note && (
            <div className="mt-5 text-white/60 text-sm">{note}</div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
