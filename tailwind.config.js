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
      'tablet': '640px',
      'tabletBig': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      colors: {
        'Secondary': '#75767F',
        'Icons': '#4A4D58',
        'Elements': '#3B3E4A',
        'Surface-2': '#323542',
        'Surface-1': '#161827',
        'Phone-Black': '#0F1121',
        'Phone-white': '#F1F2F9',
        'Phone-Accent': '#E8E9EE',
        'Phone-Green': '#27AE60',
        'Phone-Red': '#EB5757',
  
      },
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
