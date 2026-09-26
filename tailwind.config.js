/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ccff00",
        dark: {
          900: "#0b0c10",
          800: "#13151b",
          700: "#1c1f26",
          600: "#2a2e39",
        },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
