/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': "url('src/assets/backgroundSunset.jpg')",
      },
      right:{
        '3/4': '90%',
      },
    },
  },
  plugins: [],
}