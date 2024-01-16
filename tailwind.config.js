/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7c11f5',
        'dark': '#280f50',
        'light': '#dff2f9',
        'danger': '#a60909',
      },
    },
  },
  plugins: [],
}

