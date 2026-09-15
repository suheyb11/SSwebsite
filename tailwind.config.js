/** @type {import('tailwindcss').Config} */
module.exports = {
  // The site is light-only. Kept so the key is explicit rather than defaulted;
  // nothing ever adds the `dark` class, so no dark variant can match.
  darkMode: "class",
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Somtel navy — the brand colour actually used across the site.
        //
        // Read from CSS variables rather than written as hex, so a single
        // section of the site can be re-themed by redefining the variables on a
        // wrapper. The values live in globals.css; the defaults there are the
        // same navy these were before, so nothing changes by default. eDahab
        // uses this to run its pages in its own green.
        primary: {
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
        },
        // Somtel yellow — the accent used for highlights and CTAs.
        accent: {
          50: "#fffce6",
          100: "#fff7b8",
          200: "#fff08a",
          300: "#ffe95c",
          400: "#fee42e",
          500: "#fed900", // brand yellow
          600: "#d4b500",
          700: "#a88f00",
          800: "#7a6800",
          900: "#4d4100",
        },
        // Supporting cyan tint, kept from the original config.
        sky: {
          100: "#d4eef9",
          200: "#a9ddf4",
          300: "#7fcdee",
          400: "#54bce9",
          500: "#29abe3",
          600: "#2189b6",
          700: "#196788",
          800: "#10445b",
          900: "#08222d",
        },
        // Theme tokens — resolved from CSS variables so light/dark just works.
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        // A slightly stronger border for hover states and dividers that need to read.
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      // Display sizes carry tight leading and negative tracking; body stays relaxed.
      fontSize: {
        "display-xs": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.016em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.12", letterSpacing: "-0.022em" }],
        "display-md": ["3rem", { lineHeight: "1.08", letterSpacing: "-0.026em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display-xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.034em" }],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      // Layered, low-opacity shadows — closer to light than to a grey box.
      boxShadow: {
        soft: "0 1px 2px rgb(11 18 37 / 0.04), 0 8px 24px -12px rgb(11 18 37 / 0.10)",
        lift: "0 2px 6px rgb(11 18 37 / 0.06), 0 20px 40px -20px rgb(11 18 37 / 0.20)",
        glow: "0 8px 28px -8px rgb(254 217 0 / 0.55)",
        "glow-navy": "0 8px 28px -10px rgb(31 47 94 / 0.45)",
        // Faint versions, sized for outline-card hover rather than buttons.
        "glow-soft": "0 10px 30px -14px rgb(254 217 0 / 0.30)",
        "glow-navy-soft": "0 10px 30px -14px rgb(31 47 94 / 0.22)",
      },
      keyframes: {
        bounceLight: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "none" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Slow drift for the hero's background blobs.
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
        // Seamless logo strip: the track holds two copies, so -50% loops perfectly.
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        bounceLight: "bounceLight 2s ease-in-out infinite",
        gradientShift: "gradientShift 12s ease infinite",
        float: "float 9s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};
