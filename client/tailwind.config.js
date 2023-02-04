/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/pages/**/*.tsx", "./src/components/*.tsx"],
  theme: {
    extend: {
      colors: {
        "confirm-blue": "#0077b6",
      },
    },
  },
  plugins: [],
};
