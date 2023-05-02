import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import NavItems from '../../utils/map/NavItems';
import { useAppSelector } from '../../app/hooks';

const NavBar: React.FC = () => {
  const cartLength = useAppSelector(state => state.cartItems).cartItems.length;
  const favouritesLength = useAppSelector(state => state.favouriteItems).favouriteItems.length;

  return (
    <>
      <ul className='hidden text-slate-100 text-center gap-8 laptop:gap-16 tablet:flex'>
        {NavItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (
              cn(
                'flex items-center border-b-2 text-Phone-white border-Phone-white transition-all duration-300',
                { 'text-Secondary border-transparent hover:border-Phone-white': !isActive },
              )
            )}
          >
            <button
              className='uppercase text-xs tablet:text-sm laptop:text-base'
              type='button'

            >
              {item.name}
            </button>
          </NavLink>

        ))}
      </ul>
      <div className='tablet:flex hidden'>
        <NavLink
          to={
            '/favourites'
          }
          className='tablet:flex p-4 laptop:p-5 items-center border-l border-Surface-2 hover:bg-slate-600 active:bg-slate-500'
        >
          <div className='relative'>
            {favouritesLength > 0 && (
              <div className=' flex justify-center items-center w-[14px] h-[14px] bg-Phone-Red rounded-full text-[9px] absolute bottom-[50%] left-[50%] z-60'>
                <p className='flex justify-center items-end w-[14px] h-[14px] text-Phone-white'>
                  {favouritesLength}
                </p>
              </div>
            )}
            <img src={`${process.env.PUBLIC_URL!}/imgs/favourites_icon.svg`} alt='favourites' />
          </div>
        </NavLink>

        <NavLink
          to={
            '/shoppingCart'
          }
          className='tablet:flex p-4 laptop:p-5 border-l border-Surface-2 items-center hover:bg-slate-600 active:bg-slate-500'
        >
          <div className='relative'>
            {cartLength > 0 && (
              <div className=' flex justify-center items-center w-[14px] h-[14px] bg-Phone-Red rounded-full text-[9px] absolute bottom-[50%] left-[50%] z-60'>
                <p className='flex justify-center items-end w-[14px] h-[14px] text-Phone-white'>
                  {cartLength}
                </p>
              </div>
            )}
            <img src={`${process.env.PUBLIC_URL!}/imgs/shopping_cart.svg`} alt='shoppingCart' />
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
