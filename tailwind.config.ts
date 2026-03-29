import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Match4Marriage · Crimson Heritage / Editorial Elegance Design System ──
      colors: {
        // Stitch Material 3 color tokens
        "surface": "#fff8f8",
        "surface-bright": "#fff8f8",
        "surface-dim": "#f0d2e1",
        "surface-container": "#ffe8f2",
        "surface-container-low": "#fff0f5",
        "surface-container-high": "#ffe0ef",
        "surface-container-highest": "#f9dae9",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#f9dae9",
        "surface-tint": "#bf002d",
        "on-surface": "#281621",
        "on-surface-variant": "#5c3f3f",
        "on-background": "#281621",
        "background": "#fff8f8",
        "primary": "#b4002a",
        "primary-container": "#dc1e3c",
        "primary-fixed": "#ffdad9",
        "primary-fixed-dim": "#ffb3b2",
        "on-primary": "#ffffff",
        "on-primary-container": "#fff4f3",
        "on-primary-fixed": "#410009",
        "on-primary-fixed-variant": "#920020",
        "inverse-primary": "#ffb3b2",
        "secondary": "#b22548",
        "secondary-container": "#fd5e7c",
        "secondary-fixed": "#ffd9dc",
        "secondary-fixed-dim": "#ffb2bb",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#63001f",
        "on-secondary-fixed": "#400011",
        "on-secondary-fixed-variant": "#900232",
        "tertiary": "#69525e",
        "tertiary-container": "#836a77",
        "tertiary-fixed": "#f9dae9",
        "tertiary-fixed-dim": "#dcbecd",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fff4f7",
        "on-tertiary-fixed": "#281621",
        "on-tertiary-fixed-variant": "#56414c",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "outline": "#916f6e",
        "outline-variant": "#e5bdbc",
        "inverse-surface": "#3e2b36",
        "inverse-on-surface": "#ffecf4",
        // Legacy aliases
        rose: {
          50: "#FFF5F7", 100: "#FFE4EA", 200: "#FFBDCA", 300: "#FF8FA3",
          400: "#FF6B8A", DEFAULT: "#E8426A", 600: "#C4285A", 700: "#A01848", dark: "#7D0A35",
        },
        gold: {
          50: "#FFFBF0", 100: "#FFF3CC", 200: "#FFE499", 300: "#FFD166",
          DEFAULT: "#C9954A", 500: "#B07D35", dark: "#8A5E20",
        },
        cream: "#FFFAF8",
        deep: "#1A0A12",
        muted: "#8A7080",
        sage: "#7A9E7E",
      },
      fontFamily: {
        headline: ["'Noto Serif'", "Georgia", "serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        label: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        // Legacy aliases
        display: ["'Noto Serif'", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
        card: "1.25rem",
      },
      animation: {
        "float-in": "floatIn 0.5s ease-out forwards",
        "heart-bloom": "heartBloom 0.6s ease-out forwards",
        "lotus-reveal": "lotusReveal 0.8s ease-out forwards",
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heartBloom: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        lotusReveal: {
          "0%": { opacity: "0", transform: "scale(0.8) rotate(-5deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(232, 66, 106, 0.08)",
        "card-hover": "0 8px 40px rgba(232, 66, 106, 0.18)",
        gold: "0 4px 20px rgba(201, 149, 74, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
