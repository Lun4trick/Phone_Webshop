/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mont': ['mont']
    },
    screens: {
      'mobile': '0px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      backgroundImage: {
        'iphone-14-back': "url('./imgs/adScrollImgs/iphone-14-back.png')",
        'iphone-14-pros': "url('./imgs/adScrollImgs/iphone-14-pros.png')",
        'airpods': "url('./imgs/adScrollImgs/airpods.png')",
        'ipad-pro': "url('./imgs/adScrollImgs/ipad-pro.png')",
      }
    }
  },
  plugins: [],
}
