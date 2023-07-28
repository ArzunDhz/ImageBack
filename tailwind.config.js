/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-color":'#000A1A',
        'sec-color':'#1B233E',
        'pop-color':'#8A15E7'
  
      }

    },
    screens: {
      'sm': '320px',
      'md': '575px',
      'lg': '1040px',
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ]
}