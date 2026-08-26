import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useImagePreload } from "../lib/seo";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  badgeText?: string;
  badgeType?: "open" | "default";
  /** URL to a background photo (imported asset URL or public path) */
  backgroundImage?: string;
  /** Override the navy overlay gradient (e.g. for a different mood per page) */
  overlayGradient?: string;
  /** Override the CSS filter applied to the background photo */
  imageFilter?: string;
  /** Control crop focus for non-wide photos */
  imagePosition?: string;
  rightContent?: ReactNode;
  children?: ReactNode;
}

/**
 * Shared editorial page hero used throughout the Rafla site. The angled
 * image plane, subtle map geometry, and warm-gold details are intentionally
 * distinct from the source site while staying consistent with Rafla's brand.
 */
export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  badgeText,
  badgeType = "default",
  backgroundImage,
  overlayGradient,
  imageFilter,
  imagePosition,
  rightContent,
  children,
}: PageHeroProps) {
  const heroAside = rightContent;
  useImagePreload(backgroundImage);

  return (
    <section
      className="page-hero relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #061329 0%, #0B1D3E 50%, #193B6B 100%)",
      }}
    >
      {/* Background photo */}
      {backgroundImage && (
        <div className="page-hero-media absolute inset-0 overflow-hidden">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: imageFilter ?? "contrast(1.08) saturate(1.06) brightness(0.96)",
              objectPosition: imagePosition,
            }}
            fetchPriority="high"
            width={1440}
            height={960}
          />
          {/* Dark overlay over photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                overlayGradient ??
                "linear-gradient(105deg, rgba(6,14,31,0.86) 0%, rgba(11,30,61,0.6) 48%, rgba(11,30,61,0.12) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-70"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(30,58,138,0.04) 42%, rgba(255,255,255,0.08))",
            }}
            aria-hidden="true"
          />
        </div>
      )}

      <div aria-hidden="true" className="page-hero-cartography absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -bottom-24 -left-24 h-[28rem] w-[28rem]" viewBox="0 0 420 420" fill="none">
          <circle cx="210" cy="210" r="118" stroke="rgba(255,255,255,.055)" />
          <circle cx="210" cy="210" r="168" stroke="rgba(245,158,11,.08)" />
          <path d="M20 252C96 158 170 306 246 200C308 113 356 145 408 84" stroke="rgba(255,255,255,.08)" strokeWidth="1.5" />
          <path d="M70 344C124 278 184 354 250 294C306 244 348 263 392 220" stroke="rgba(245,158,11,.11)" />
        </svg>
        <div className="absolute left-[7%] top-20 h-px w-24 bg-gradient-to-r from-gold-400/70 to-transparent" />
        <div className="absolute left-[7%] top-[5.35rem] text-[9px] font-bold uppercase tracking-[.34em] text-white/25">Westside · Los Angeles</div>
      </div>

      <div className="container relative z-10 pt-28 pb-24 md:pt-32 md:pb-28">
        <div
          className={
            heroAside
              ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              : "max-w-3xl"
          }
        >
          <div className="hero-copy-enter relative">
            <div
              aria-hidden="true"
              className="absolute -left-6 top-2 hidden h-40 w-px bg-gradient-to-b from-gold-300/0 via-gold-300/70 to-gold-300/0 md:block"
            />
            {breadcrumb && (
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/55">
                <NavLink to="/" className="hover:text-white/90 transition-colors">
                  Home
                </NavLink>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white/85 font-medium">{breadcrumb}</span>
              </nav>
            )}

            {badgeText && (
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-5 border ${
                  badgeType === "open"
                    ? "bg-gold-500/15 border-gold-400/30 text-gold-300"
                    : "bg-white/8 border-white/15 text-white/80"
                }`}
                style={badgeType !== "open" ? { background: "rgba(255,255,255,0.06)" } : undefined}
              >
                {badgeType === "open" && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                )}
                {badgeText}
              </div>
            )}

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>

            {/* Gold accent rule */}
            <div
              className="mt-5 mb-5 rounded-full"
              style={{ width: "56px", height: "4px", background: "var(--gold-500)" }}
            />

            {subtitle && (
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">{subtitle}</p>
            )}

            {children && <div className="mt-7">{children}</div>}

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-2 text-[12px] font-semibold text-white/75 sm:grid-cols-3">
              {["Independent agency", "Mar Vista office", "Three-language help"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/[0.07] px-3 py-2 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.11]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {heroAside && (
            <div className="hero-aside-enter hidden lg:block">
              {heroAside}
            </div>
          )}
        </div>
      </div>

      <div aria-hidden="true" className="page-hero-cut absolute inset-x-0 bottom-0 h-12 bg-white" />
    </section>
  );
}
