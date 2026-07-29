import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Midnight-blue theme. Key names kept for compatibility; values are
        // all cool blue-family tones so the whole site reads as one palette.
        ink: "#050914",
        surface: "#0b1330",
        neon: {
          pink: "#818cf8", // periwinkle (was hot pink)
          purple: "#6366f1", // indigo
          blue: "#3b82f6", // royal blue
          cyan: "#38bdf8", // sky/cyan
          lime: "#22d3ee", // teal-cyan (was lime green)
          amber: "#7dd3fc", // light sky (was amber)
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradientShift: "gradientShift 8s ease infinite",
        marquee: "marquee 28s linear infinite",
        spinSlow: "spinSlow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
