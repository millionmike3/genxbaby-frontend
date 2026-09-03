/** @type {import('tailwindcss').Config} */
const { colors, typography, spacing, radiuses, shadows } = require("./design-system/theme");

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,

      // FIX: typography.fontFamily may be undefined — safely merge it
      fontFamily: {
        ...(typography?.fontFamily || {}),
        rounded: ["Nunito", "sans-serif"],
      },

      fontSize: typography?.fontSize || {},

      spacing,
      borderRadius: radiuses,
      boxShadow: {
        ...shadows,

        neonGreen: "0 0 12px rgba(0,255,127,0.6)",
        neonGreenSoft: "0 0 20px rgba(0,255,127,0.4)",
      },

      backgroundImage: {
        stars: "url('/stars.png')",
        grid: "url('/grid.svg')",
        neonSpace: "linear-gradient(to bottom, #00ff7f, #003300, #000000)",
      },

      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
        pulseGreen: {
          "0%": { boxShadow: "0 0 0px rgba(0,255,127,0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(0,255,127,0.7)" },
          "100%": { boxShadow: "0 0 0px rgba(0,255,127,0.4)" },
        },
      },

      animation: {
        floatSlow: "float 6s ease-in-out infinite",
        pulseGreen: "pulseGreen 3s infinite",
      },
    },
  },
  plugins: [],
};
