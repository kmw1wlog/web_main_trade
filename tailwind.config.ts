import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        panel: "#0d1b2d",
        panelSoft: "#14243b",
        line: "#22344f",
        accent: "#4ade80",
        accentSoft: "#86efac",
        warn: "#fbbf24",
        text: "#e5eef9",
        muted: "#9fb2ca",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(7, 17, 31, 0.45)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
