import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItems from '../../utils/map/NavItems';

type Props = {
  isMenuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ isMenuOpen }) => {
  const headerHeight = document.getElementById('header')?.offsetHeight;
  const viewPortHeight = window.innerHeight;
  const menuHeight = (viewPortHeight - (headerHeight ?? 0));

  return (
    <div
      style={{
        top: `${headerHeight}px`,
        height: isMenuOpen
          ? `${menuHeight}px`
          : 0,
      }}
      className='fixed top-[53px] flex flex-col justify-between opacity-95 z-10 flex-grow tablet:hidden overflow-hidden w-full bg-gray-900 transition-height duration-1000'
    >
      <ul className='flex flex-col text-Phone-white text-xs text-center tablet:hidden items-center mb-8'>
        {NavItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className='flex font-mont font-semibold text-Phone-white items-center border-b-2 border-transparent hover:border-Phone-white transition-all duration-300 pt-8'
          >
            <button
              className='uppercase'
              type='button'
            >
              {item.name}
            </button>
          </NavLink>
        ))}
      </ul>
      <div className='tablet:hidden w-full border-t border-Surface-2 h-[64px]'>
        <button type='button' className='w-1/2 p-4 h-full laptop:p-5 items-center border-Surface-2 hover:bg-slate-600 active:bg-slate-500 active:border-b-4 active:border-b-white'>
          <img
            className='mx-auto'
            src={`${process.env.PUBLIC_URL}/imgs/favourites_icon.svg`}
            alt=''
          />
        </button>
        <button type='button' className='w-1/2 p-4 h-full justify-center laptop:p-5  border-l border-Surface-2 items-center hover:bg-slate-600 active:bg-slate-500 active:border-b-4 active:border-b-white'>
          <img
            src={`${process.env.PUBLIC_URL}/imgs/shopping_cart.svg`}
            className='mx-auto'
            alt=''
          />
        </button>
      </div>
    </div>
  );
};

