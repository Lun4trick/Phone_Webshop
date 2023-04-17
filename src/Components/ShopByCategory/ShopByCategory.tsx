import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import ProductCategories from '../../utils/map/ProductCategories';

const ShopByCategory: React.FC = () => (
  <section className='mb-20'>
    <p className='font-bold text-white text-[32px] mb-6'>
      Shop by category
    </p>
    <div className='flex flex-col tablet:flex-row w-full gap-4'>
      {ProductCategories.map(category => (
        <NavLink
          key={category.name}
          to={category.path}
          className='flex flex-col w-full capitalize hover:scale-105 transition-all'
        >
          <div
            className={cn(
              'w-full aspect-square bg-no-repeat mb-6',
              { 'bg-[30px_100px]': category.name === 'accessories' },
              { 'bg-[30px_40px]': category.name !== 'accessories' },
            )}
            style={{
              backgroundImage: `url(${category.img})`,
              backgroundSize: category.name === 'accessories'
                ? '180%'
                : '130%',
              backgroundColor: category.color,
            }}
          />
          <p className='text-white'>
            {category.name}
          </p>
        </NavLink>
      ))}
    </div>
  </section>
);

export default ShopByCategory;
