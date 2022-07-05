/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#4265D6",
        "main-dark": "#023047",
        "main-light": "#ADADAD",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
