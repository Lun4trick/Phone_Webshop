import React from 'react';
import { useAppSelector } from '../../app/hooks';

const CheckOut: React.FC = () => {
  const { totalCost } = useAppSelector(state => state.totalCost);
  const { cartItems } = useAppSelector(state => state.cartItems);
  const totalItems = cartItems.map(item => item.count)
    .reduce((a, b) => a + b);

  return (
    <section className='flex flex-col justify-center p-6 items-center border-[1px] border-Elements'>
      <p
        className='text-Phone-white text-3xl font-bold'
      >
        {`$${totalCost}`}
      </p>
      <p className='text-sm text-Secondary w-full text-center mb-4 border-b-[1px] pb-4 border-Elements'>
        {`Total for ${totalItems} items`}
      </p>
      <button className='w-full bg-Phone-Accent py-[14px] text-Phone-white hover:bg-[#A378FF]'>
        Checkout
      </button>
    </section>
  );
};

export default CheckOut;
