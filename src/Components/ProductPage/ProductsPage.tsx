import React from 'react';
import {v4 as uuidv4} from 'uuid'
import { useLocation } from 'react-router-dom';
import ProductCategories from '../../utils/map/ProductCategories';
import { useAppSelector } from '../../app/hooks';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import PhoneCard from '../PhoneCard/PhoneCard';

enum ProductType {
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories'
};

const ProductPage: React.FC = () => {
  const location = useLocation().pathname;
  const currentProduct: ProductType = location.slice(1) as ProductType.PHONES;
  const title = ProductCategories
    .find(category => category.path === location)?.name;
  const products = useAppSelector(state => state.allPhones)[currentProduct];

  return (
    <section className='max-w-[1200px] mx-auto'>
      <div className='flex gap-[15px] mb-6'>
        <img 
          className='aspect-square w-4 fill-Phone-white'
          src={`${process.env.PUBLIC_URL}/imgs/Home-ico.svg`} 
          alt='Home' 
        />
        <p className='text-Icons'>
          {'>'}
        </p>
        <p className='capitalize text-Secondary'>
          {currentProduct}
        </p>
      </div>
      <h1 className='text-white text-4xl capitalize font-bold mb-2'>
        {title}
      </h1>
      <p className='text-Secondary mb-8'>
        {`${products.length} models`}
      </p>
      <DropDownMenu />
      <div className='grid grid-cols-1 tablet:grid-cols-2 tabletBig:grid-cols-3 laptop:grid-cols-4 gap-x-4 gap-y-10 w-full'>
        {products.map(product => (
          <PhoneCard key={uuidv4()} phonePreview={product}/>
        ))}
      </div>
    </section>
  )
}

export default ProductPage;