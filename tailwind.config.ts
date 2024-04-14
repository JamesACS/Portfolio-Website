import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        lcarsback: "#000",
        primary: "#313748",
        primarytext: "#9fa5b8",
        secondary: "#53596c",
        secondaryhover: "#9fa5b8",
        tertiary: "#6e748a",
        tertiaryhover: "#80c8ec",
        colorquaternary: "#915e4d",
        colorquinternary: "#8e4437",
        colortext: "#9fa5b8",
        colortextdark: "#000",
        colorlink: "#3c8dbc",
        colordanger: "#d55138",
        colordangerbright: "#f37052",
        colorredalert: "#ea3323",
        colorsuccess: "#0bd08a",
        colorsuccessdark: "#024b3b",
        colordisabled: "#1f2228",
        colorsupplement01: "#411e17",
        colorsupplement02: "#131315",
        colorsupplement03: "#bcbc53",
        colorsupplement04: "#a856a8",
      },
      fontFamily: {
        sans: [
          '"Antonio var", sans-serif',
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32',
          },
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
