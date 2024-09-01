// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brown: {
          100: "#f7f1e3",
          200: "#e2d1c3",
          300: "#cdb1a3",
          400: "#b89183",
          500: "#a37063",
          600: "#8e5053",
          700: "#794043",
          800: "#643033",
          900: "#4f2023",
        },
      },
      fontFamily: {
        vibes: ["Great Vibes", "cursive"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
