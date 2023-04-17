import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItems from '../../utils/map/NavItems';

const NavBar: React.FC = () => (
  <>
    <ul className='hidden text-slate-100 text-center gap-8 laptop:gap-16 tablet:flex'>
      {NavItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className='flex items-center border-b-2 border-transparent hover:border-white transition-all duration-300'
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
      <button
        type='button'
        className='tablet:flex p-4 laptop:p-5 items-center border-l border-Surface-2 hover:bg-slate-600 active:bg-slate-500'
      >
        <img src={`${process.env.PUBLIC_URL}/imgs/favourites_icon.svg`} alt='' />
      </button>

      <button
        type='button'
        className='tablet:flex p-4 laptop:p-5 border-l border-Surface-2 items-center hover:bg-slate-600 active:bg-slate-500'
      >
        <img src={`${process.env.PUBLIC_URL}/imgs/shopping_cart.svg`} alt='' />
      </button>
    </div>
  </>

);

export default NavBar;
