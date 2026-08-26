/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
    extend: {
      colors: {
        /* Rafla brand — sampled from the supplied logo and business card */
        brand: {
          50:  "#f3f6fb",
          100: "#e4ebf5",
          200: "#c6d5e9",
          300: "#96b3d5",
          400: "#628cc0",
          500: "#3569a8",
          600: "#234f89",
          700: "#193b6b",
          800: "#102653",   /* exact logo/card navy */
          900: "#0b1d3e",
          950: "#061329",
        },
        /* Warm metallic family built around the exact card/logo gold */
        gold: {
          50:  "#fdf9ed",
          100: "#f9edc8",
          200: "#f6dfa0",
          300: "#f3ce70",
          400: "#eabb3f",
          500: "#e3a719",   /* exact logo/card gold */
          600: "#b9820f",
          700: "#8b610d",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ['"Bricolage Grotesque"', '"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "hero":    ["clamp(2.5rem, 5vw + 1rem, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "800" }],
        "section": ["clamp(1.75rem, 3vw + 0.5rem, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "title":   ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "xs":     "0 1px 2px rgba(0,0,0,0.05)",
        "soft":   "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "lifted": "0 4px 16px -2px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.06)",
        "heavy":  "0 20px 40px -8px rgba(0,0,0,0.15), 0 8px 16px -4px rgba(0,0,0,0.08)",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-speed, 40s) linear infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
