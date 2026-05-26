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
        ink: "#05111F",
        navy: "#0A1B33",
        navySoft: "#102A4C",
        panel: "#0E213B",
        panelSoft: "#132E52",
        line: "#2B3F60",
        gold: "#D6B464",
        goldSoft: "#F2D98C",
        goldDeep: "#9A7133",
        accent: "#D6B464",
        accentSoft: "#F2D98C",
        ivory: "#F8F4EA",
        paper: "#FFFDF7",
        paperText: "#0B1F38",
        paperMuted: "#58677A",
        warn: "#C99A2E",
        text: "#F8FAFC",
        muted: "#B8C3D6",
      },
      boxShadow: {
        glow: "0 22px 70px rgba(3, 12, 24, 0.5)",
        premium: "0 24px 80px rgba(0, 0, 0, 0.36)",
        paper: "0 18px 60px rgba(5, 17, 31, 0.18)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        premiumGlow:
          "radial-gradient(circle at 20% 0%, rgba(214,180,100,0.18), transparent 34%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.08), transparent 26%)",
      },
    },
  },
  plugins: [],
};

export default config;
