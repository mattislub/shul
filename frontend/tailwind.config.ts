import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#F6E6B4",
          DEFAULT: "#D4AF37",
          dark: "#B8860B"
        },
        stone: {
          light: "#F3F2ED",
          DEFAULT: "#E0D6C2",
          dark: "#C8B693"
        }
      },
      fontFamily: {
        heading: ["'Assistant'", "sans-serif"],
        body: ["'Rubik'", "sans-serif"]
      },
      backgroundImage: {
        "marble-texture": "linear-gradient(135deg, rgba(230,224,209,0.8), rgba(255,255,255,0.95))"
      }
    }
  },
  plugins: []
};

export default config;
