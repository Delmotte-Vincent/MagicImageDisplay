/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slide: "slideBottom 0.2s linear",
        fadeIn: "fadeIn 1s linear forwards",
        fadeOut: "fadeOut 1s linear forwards",
      },
    },
  },
  plugins: [],
};
