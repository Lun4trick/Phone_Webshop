/* eslint-disable import/prefer-default-export */
import React from 'react';
import { AdScroll } from '../AdScroll/Adscroll';
import ShopByCategory from '../ShopByCategory/ShopByCategory';
import { useAppSelector } from '../../app/hooks';
import ProductScroll from '../ProductScroll/ProductScroll';

export const HomePage: React.FC = () => {
  const newModels = useAppSelector(state => state.allPhones.phones)
    .filter(phone => phone.year >= 2019);
  const hotDeals = useAppSelector(state => state.allPhones.phones)
    .filter(phone => (phone.fullPrice - phone.price) > 90);

  return (
    <section className='h-full flex-1 max-w-[1200px] mx-auto w-full'>
      <h1 className='text-Phone-white text-[32px] font-mont font-bold leading-10 mb-[24px]'>
        Welcome to Nice Gadgets store!
      </h1>
      <AdScroll />
      <ProductScroll
        products={newModels}
        title='Brand new models'
      />
      <ShopByCategory />
      <ProductScroll
        products={hotDeals}
        title='Hot deals'
      />
    </section>
  );
};
