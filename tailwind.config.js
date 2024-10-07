/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./src/**/*.{html,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
