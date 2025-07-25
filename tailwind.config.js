/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deepPurple: '#6B21A8',  // Make sure it's exactly as you want
      },
    },
  },
  plugins: [],
}
