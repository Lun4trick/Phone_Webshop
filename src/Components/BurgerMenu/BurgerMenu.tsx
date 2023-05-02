import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItems from '../../utils/map/NavItems';
import { useAppSelector } from '../../app/hooks';

type Props = {
  isMenuOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ isMenuOpen }) => {
  const headerHeight = document.getElementById('header')?.offsetHeight ?? 0;
  const viewPortHeight = window.innerHeight;
  const menuHeight = (viewPortHeight - (headerHeight));
  const cartLength = useAppSelector(state => state.cartItems).cartItems.length;
  const favouritesLength = useAppSelector(state => state.favouriteItems).favouriteItems.length;

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
      <div className='tablet:hidden flex w-full border-t border-Surface-2 h-[64px]'>
        <NavLink
          to='/favourites'
          type='button'
          className='h-full items-center justify-center w-1/2 flex m-0 laptop:p-5 border-Surface-2 hover:bg-slate-600 active:bg-slate-500 active:border-b-4 active:border-b-white'
        >
          <div className='relative'>
            {favouritesLength > 0 && (
              <div className=' flex justify-center items-center w-[14px] h-[14px] bg-Phone-Red rounded-full text-[9px] absolute bottom-[50%] left-[50%] z-60'>
                <p className='flex justify-center items-end w-[14px] h-[14px] text-Phone-white'>
                  {favouritesLength}
                </p>
              </div>
            )}
            <img
              src={`${process.env.PUBLIC_URL!}/imgs/favourites_icon.svg`}
              alt='favourites'
            />
          </div>
        </NavLink>
        <NavLink
          to='/shoppingCart'
          type='button'
          className='flex items-center justify-center w-1/2 h-full laptop:p-5 border-l border-Surface-2 hover:bg-slate-600 active:bg-slate-500 active:border-b-4 active:border-b-white'
        >
          <div className='relative'>
            {cartLength > 0 && (
              <div className=' flex justify-center items-center w-[14px] h-[14px] bg-Phone-Red rounded-full text-[9px] absolute bottom-[50%] left-[50%] z-60'>
                <p className='flex justify-center items-end w-[14px] h-[14px] text-Phone-white'>
                  {cartLength}
                </p>
              </div>
            )}
            <img
              src={`${process.env.PUBLIC_URL!}/imgs/shopping_cart.svg`}
              alt='shoppingCart'
            />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

