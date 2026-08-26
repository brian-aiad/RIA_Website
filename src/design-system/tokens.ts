/**
 * Design tokens — single source of truth for raflainsurance.com
 *
 * DO NOT introduce ad-hoc colors, gradients, shadows, or animation timings
 * outside this file. If you need a new value, add it here with a comment.
 * Lint rule: seo-lint.mjs checks for inline hex colors in className attributes.
 */

// ─── Colors ──────────────────────────────────────────────────────────────────
// These mirror tailwind.config.js. Use Tailwind classes (bg-brand-900) in JSX.
// Use these constants only in code that can't use Tailwind (e.g., style props,
// CSS-in-JS, Framer Motion color animations).
export const colors = {
  // Navy — primary brand
  navyDeepest:   "#060e1f",  // brand-950: darkest hero, footer
  navyDeep:      "#0b1e3d",  // brand-900: hero overlays, dark cards
  navyStrong:    "#0f2147",  // brand-800: buttons, icon backgrounds
  navyMid:       "#1e3a8a",  // brand-700: text links, hover states
  navyLight:     "#dbeafe",  // brand-100: pale navy tint for light backgrounds
  navyPale:      "#eff6ff",  // brand-50: very light backgrounds
  // Gold — accent ONLY (primary CTAs, stars, highlights — nowhere else)
  goldDark:      "#d97706",  // gold-600: text, dark contexts
  gold:          "#f5a623",  // gold-500: primary CTA background
  goldLight:     "#fcd34d",  // gold-400: lighter highlight
  // Neutrals
  grayDark:      "#0f172a",  // slate-900: headings
  grayBody:      "#475569",  // slate-600: body text
  grayMid:       "#94a3b8",  // slate-400: captions, metadata
  grayBorder:    "#e2e8f0",  // slate-200: card borders
  grayBg:        "#f8fafc",  // slate-50: off-white section backgrounds
  white:         "#ffffff",
};

// ─── Gradients ───────────────────────────────────────────────────────────────
// Only 3 gradient patterns. All others are drift.
export const gradients = {
  // hero: full-bleed dark backgrounds (home hero, dark CTAs)
  hero:   `linear-gradient(135deg, ${colors.navyDeepest} 0%, ${colors.navyDeep} 100%)`,
  // mesh: hero mesh pattern used on dark sections (ClaimsCTA, hero pages)
  mesh:   `radial-gradient(ellipse at 20% 50%, rgba(30,58,138,0.15) 0%, transparent 60%),
           radial-gradient(ellipse at 80% 20%, rgba(245,166,35,0.08) 0%, transparent 50%),
           ${colors.navyDeepest}`,
  // subtle: very light tint for alternating section backgrounds
  subtle: `linear-gradient(180deg, rgba(30,58,138,0.03) 0%, transparent 100%)`,
};

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const shadows = {
  // Use Tailwind utilities (shadow-soft, shadow-lifted, etc.) in JSX.
  // These are reference values for the custom Tailwind shadow scale.
  soft:     "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  lifted:   "0 4px 8px rgba(15,23,42,0.08), 0 12px 32px rgba(15,23,42,0.10)",
  heavy:    "0 8px 24px rgba(15,23,42,0.14), 0 2px 6px rgba(15,23,42,0.06)",
  goldGlow: "0 4px 12px rgba(245,166,35,0.30)",
};

// ─── Border radii ─────────────────────────────────────────────────────────────
// Always pick from this set. "rounded-[13px]" is drift.
export const radii = {
  input:  "0.5rem",   // 8px  — text inputs, small tags
  button: "0.75rem",  // 12px — buttons
  card:   "1rem",     // 16px — standard cards
  panel:  "1.5rem",   // 24px — large panels, hero inset
  modal:  "2rem",     // 32px — modals, hero cards
  pill:   "9999px",   // pill badges, "open now" label
};

// ─── Spacing ─────────────────────────────────────────────────────────────────
// Vertical rhythm. Enforce via the .sp (section padding) utility class.
export const spacing = {
  sectionVertDesktop: "6rem",    // 96px — primary section top/bottom padding
  sectionVertMobile:  "4rem",    // 64px — mobile override
  subSectionVert:     "3rem",    // 48px — between sub-sections within a section
  cardPad:            "1.5rem",  // 24px — inside cards
  containerMax:       "72rem",   // 1152px — max-width for .container
};

// ─── Motion ───────────────────────────────────────────────────────────────────
// All animations use these three timing profiles.
export const motion = {
  fast:     { duration: 0.18, ease: [0.4, 0, 0.2, 1] as const },
  base:     { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const },
  emphasis: { duration: 0.50, ease: [0.16, 1, 0.3, 1] as const },

  // Standard scroll-in pattern. Use <RevealOnScroll> or spread this into motion.div.
  fadeUp: {
    initial:     { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: "-60px" as const },
    transition:  { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },

  // Grid stagger — add delay: index * stagger to each child's transition
  stagger: 0.05,

  // Card hover — apply via CSS class .card-hover, NOT via Framer Motion
  cardHover: { y: -2, transition: { duration: 0.18 } },
};

// ─── Typography ───────────────────────────────────────────────────────────────
// Reference values — enforce through .display-1/.display-2/eyebrow CSS classes.
// These are for documentation; use the CSS classes in JSX.
export const typography = {
  displayHero: { size: "clamp(2.25rem, 5vw + 0.5rem, 4rem)", weight: 900, lh: 1.08, ls: "-0.03em" },
  display1:    { size: "clamp(2rem, 4vw, 3rem)",               weight: 800, lh: 1.1,  ls: "-0.025em" },
  display2:    { size: "clamp(1.6rem, 3vw + 0.4rem, 2.5rem)", weight: 800, lh: 1.15, ls: "-0.02em" },
  h3:          { size: "1.25rem",                               weight: 700, lh: 1.3  },
  body:        { size: "1rem",                                  weight: 400, lh: 1.6  },
  bodyLg:      { size: "1.125rem",                              weight: 400, lh: 1.65 },
  eyebrow:     { size: "0.6875rem",                             weight: 700, lh: 1,   ls: "0.14em", transform: "uppercase" },
  caption:     { size: "0.75rem",                               weight: 500, lh: 1.4  },
};
