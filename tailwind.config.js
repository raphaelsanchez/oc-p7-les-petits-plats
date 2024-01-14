/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Anton", "sans-serif"],
      body: ["Manrope", "sans-serif"],
    },
    colors: {
      accent: "#FFD15B",
      white: "#FFFFFF",
      neutral: {
        300: "#EDEDED",
        600: "#6e6e6e",
        900: "#1B1B1B",
      },
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
}
