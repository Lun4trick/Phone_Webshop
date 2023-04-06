/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Mont'],
    },
    screens: {
      'mobile': '0px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      backgroundImage: {
        'category-phones': "url(https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/img/banners/category-phones.png)",
        'category-tablets': "url(https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/img/banners/category-tablets.png)",
        'category-accessories': "url(https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/img/banners/category-accessories.png)",
        'iphone-14-back': "url('./imgs/adScrollImgs/iphone-14-back.png')",
        'iphone-14-pros': "url('./imgs/adScrollImgs/iphone-14-pros.png')",
        'airpods': "url('./imgs/adScrollImgs/airpods.png')",
        'ipad-pro': "url('./imgs/adScrollImgs/ipad-pro.png')",
      }
    }
  },
  plugins: [],
}
