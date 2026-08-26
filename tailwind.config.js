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
        /* Brand — derived from the OIS logo shield blue */
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",   /* bright blue accent */
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e3a8a",   /* logo navy */
          900: "#1e2f5e",
          950: "#0f172a",   /* near-black navy */
        },
        /* Gold accent for CTAs */
        gold: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"DM Sans"', '"Inter"', "system-ui", "sans-serif"],
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
