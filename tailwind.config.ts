import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-brutalist palette: raw cream base + two saturated accents
        cream: "#F5F0E4",
        ink: "#0D0D0D",
        yolk: "#FFE600", // electric yellow
        punch: "#FF3EA5", // hot pink
        zap: "#B6F13D", // lime, used sparingly for tags/links
        // dark mode surface
        void: "#111110",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        brut: "6px 6px 0 0 #0D0D0D",
        "brut-sm": "4px 4px 0 0 #0D0D0D",
        "brut-lg": "10px 10px 0 0 #0D0D0D",
        "brut-press": "2px 2px 0 0 #0D0D0D",
        "brut-pink": "6px 6px 0 0 #FF3EA5",
        "brut-lime": "6px 6px 0 0 #B6F13D",
        "brut-dark": "6px 6px 0 0 #F5F0E4",
      },
      borderWidth: {
        3: "3px",
        5: "5px",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        pill: "999px",
      },
      transitionTimingFunction: {
        brut: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
