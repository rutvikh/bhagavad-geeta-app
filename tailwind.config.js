/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#C0521A',
        gold: '#B8860B',
        parchment: '#FFF8E7',
        'light-gold': '#F5E6C8',
        'dark-brown': '#2C1A00',
        'deep-brown': '#3E1C00',
      },
      fontFamily: {
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
        serif: ['Georgia', '"Libre Baskerville"', 'serif'],
        sans: ['"Open Sans"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
