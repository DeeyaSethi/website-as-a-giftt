import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        handwriting: ["var(--font-great-vibes)", "cursive"],
        sans: ["var(--font-outfit)", "sans-serif"], // Default sans to Outfit
      },
    },
  },
  plugins: [],
};
export default config;

