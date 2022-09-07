/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.tsx"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      keyframes: {
        colorChange: {
          "0%, 100%": { color: "rgb(239,68,68)" },
          "50%": { color: "rgb(248,133,133)" },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        rotateLoading: {
          "0%": { transform: "scale(1) rotate(360deg)" },
          "50%": { transform: "scale(.6) rotate(-360deg)" },
        },
      },
      animation: {
        "color-change": "colorChange 2s ease-in-out infinite",
        "waving-img": "wave 2s linear infinite",
        "rotate-loading": "rotateLoading 5s linear infinite",
      },
    },
  },
  plugins: [],
};
