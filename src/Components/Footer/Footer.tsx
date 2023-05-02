import React from 'react';
import { NavLink } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer: React.FC = () => (
  <div className='flex tablet:flex-row flex-col relative w-full bottom-0 bg-[#0F1121] h-fit border-t border-gray-600 py-5 tablet:px-20 laptop:px-28 justify-between font-mont font-bold text-xs px-4'
  >
    <img
      className='max-h-[30px] max-w-[90px] mb-8 tablet:mb-0'
      src={`${process.env.PUBLIC_URL!}/imgs/logo.svg`}
      alt=''
    />
    <div className='flex tablet:flex-row flex-col laptop:gap-24 tablet:gap-12 tablet:mb-0 gap-4 uppercase tablet:items-center mb-8'>
      <NavLink to='https://github.com/Lun4trick' className='text-white'>
        GitHub
      </NavLink>

      <NavLink to='https://github.com/Lun4trick' className='text-white'>
        Contacts
      </NavLink>

      <NavLink to='https://github.com/Lun4trick' className='text-white'>
        Rights
      </NavLink>
    </div>
    <div className='flex text-gray-600 gap-2 items-end mx-auto tablet:m-0'>
      <p>Back to Top</p>
      <button
        type='button'
        className='flex justify-center items-center w-[32px] aspect-square bg-[#323542] hover:bg-[#4A4D58]'
        onClick={scrollToTop}
      >
        <img
          src={`${process.env.PUBLIC_URL!}/imgs/back-to-top.svg`}
          alt=''
        />
      </button>
    </div>
  </div>
);
