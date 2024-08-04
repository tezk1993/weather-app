/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': "url('public/backgroundSunset.jpg')",
      },
      right:{
        '3/4': '90%',
      },
    },
  },
  plugins: [],
}