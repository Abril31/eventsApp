/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#353535",
        deco: "#3a0ca3",
        button1: "#f4f3ee",
        otro: "#ffe45e",
      },
      fontFamily: {
        jomhuria: ["jomhuria-regular-webfont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
