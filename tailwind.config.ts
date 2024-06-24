import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        lato: ["var(--font-lato)"],
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        bg_dark: "#0D0D0D",
        primary: "#E05824",
        secondary: "#2D2D2D",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
