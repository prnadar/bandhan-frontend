import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Bandhan · Ivory & Marigold Design System ──────────────────────
      colors: {
        marigold: {
          DEFAULT: "#C4520F",
          light:   "#E06A1A",
          dark:    "#9A3E0A",
        },
        gold: {
          DEFAULT: "#9A6B00",
          light:   "#C89020",
          dark:    "#7A5200",
        },
        ivory: {
          DEFAULT: "#FAF6EE",
          dark:    "#F2EBD8",
        },
        deep:   "#1C0F06",
        sage:   "#5C7A52",
        saffron: "#E06A1A",
      },
      fontFamily: {
        display:     ["Cormorant", "Georgia", "serif"],
        devanagari:  ["Noto Serif Devanagari", "serif"],
        body:        ["Montserrat", "system-ui", "sans-serif"],
      },
      fontSize: {
        body: ["1rem", { lineHeight: "1.6" }],
      },
      animation: {
        "float-in":     "floatIn 0.5s ease-out forwards",
        "heart-bloom":  "heartBloom 0.6s ease-out forwards",
        "lotus-reveal": "lotusReveal 0.8s ease-out forwards",
      },
      keyframes: {
        floatIn: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heartBloom: {
          "0%":   { transform: "scale(0)", opacity: "0" },
          "60%":  { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        lotusReveal: {
          "0%":   { opacity: "0", transform: "scale(0.8) rotate(-5deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
      boxShadow: {
        card:       "0 4px 24px rgba(196, 82, 15, 0.08)",
        "card-hover": "0 8px 40px rgba(196, 82, 15, 0.15)",
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
