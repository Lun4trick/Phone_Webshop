/* eslint-disable import/prefer-default-export */
import React from 'react';
import { AdScroll } from '../AdScroll/Adscroll';
import BrandNewModels from '../BrandNewModels/BrandNewModels';

export const HomePage: React.FC = () => (
  <section className='h-full flex-1 p-4 max-w-[1200px] mx-auto w-full'>
    <h1 className="text-white text-[32px] font-mont font-bold leading-10 mb-[24px]">
      Welcome to Nice Gadgets store!
    </h1>
    <AdScroll />
    <BrandNewModels />
  </section>
);