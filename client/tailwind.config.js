/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     colors:{
      primary:"rgb(193, 18, 31)",

     }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ]
}

