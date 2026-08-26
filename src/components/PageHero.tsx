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
 * Shared page hero used by Services / Contact / About / Locations.
 * Matches the home hero treatment: photo background + dark overlay,
 * diagonal line texture, vignette, Playfair Display headline, gold
 * accent rule, and a wave divider.
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
          "linear-gradient(135deg, #060E1F 0%, #0B1E3D 50%, #162D5E 100%)",
      }}
    >
      {/* Background photo */}
      {backgroundImage && (
        <>
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
        </>
      )}

      {/* Diagonal line texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, transparent, transparent 30px, rgba(255,255,255,0.018) 30px, rgba(255,255,255,0.018) 31px)",
        }}
      />

      {/* Vignette edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(6,14,31,0.45) 100%)",
        }}
      />

      {/* ─── Floating decorative accents (brand personality, no impact on layout) ─── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
        <svg
          className="absolute -top-6 right-6 lg:right-24 w-56 h-56 animate-float"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          style={{ color: "rgba(245,158,11,0.07)" }}
        >
          <path d="M50 8L12 22v24c0 20 14 38 38 46 24-8 38-26 38-46V22L50 8z" />
          <path d="M50 16L18 28v20c0 16 11 30 32 38 21-8 32-22 32-38V28L50 16z" strokeOpacity="0.5" />
        </svg>
        <svg
          className="absolute bottom-20 left-4 lg:left-16 w-28 h-28"
          viewBox="0 0 110 110"
          fill="currentColor"
          style={{ color: "rgba(255,255,255,0.04)" }}
        >
          {Array.from({ length: 25 }, (_, i) => (
            <circle key={i} cx={(i % 5) * 22 + 11} cy={Math.floor(i / 5) * 22 + 11} r="3" />
          ))}
        </svg>
        <svg
          className="absolute top-[58%] right-2 lg:right-14 w-24 h-24 animate-float-delayed"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          style={{ color: "rgba(255,255,255,0.04)" }}
        >
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" />
        </svg>
        <div
          className="absolute top-14 left-[36%] w-16 h-16 rounded-full border animate-spin-slow"
          style={{ borderColor: "rgba(245,158,11,0.07)" }}
        />
        <svg
          className="absolute top-24 left-8 lg:left-20 w-7 h-7 animate-float"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: "rgba(255,255,255,0.05)", animationDelay: "0.8s" }}
        >
          <rect x="10" y="2" width="4" height="20" rx="2" />
          <rect x="2" y="10" width="20" height="4" rx="2" />
        </svg>
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

      {/* Wave divider — same SVG used everywhere */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", height: "60px" }}
        >
          <path
            d="M0 64L1440 64L1440 24C1200 64 900 4 720 24C540 44 240 4 0 24L0 64Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
