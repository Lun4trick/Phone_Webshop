import { ProductCategory } from '../types/ProductCategory';

const ProductCategories: ProductCategory[] = [
  {
    name: 'phones',
    img: 'https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/img/banners/category-phones.png',
    path: '/phones',
    color: '#efcdb4'
  },
  {
    name: 'tablets',
    img: 'https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/img/banners/category-tablets.png',
    path: '/tablets',
    color: '#8D8D92'
  },
  {
    name: 'accessories',
    img: 'https://phone-shop-imgs.s3.eu-north-1.amazonaws.com/img/banners/category-accessories.png',
    path: '/accessories',
    color: '#973D5F'
  }
];

export default ProductCategories;