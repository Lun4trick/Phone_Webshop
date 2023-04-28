/* eslint-disable import/prefer-default-export */
import React from 'react'
import { NavLink } from 'react-router-dom';
import NavItems from '../NavItems';

type Props = {
  isMenuOpen: boolean;
}

export const BurgerMenu: React.FC<Props> = ({ isMenuOpen }) => (
  <div className={`fixed z-40 flex flex-col h-screen tablet:hidden w-full bg-gray-900 transition-transform duration-500 transform overflow-y: scroll ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <ul className="flex flex-col text-slate-100 text-xs text-center tablet:hidden items-center">
      {NavItems.map(item => (
        <NavLink 
          key={item.path}
          to={item.path}
          className="flex items-center border-b-2 border-transparent hover:border-white transition-all duration-300 pt-8"
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
    <div className="tablet:hidden fixed bottom-0 w-full">
      <button type='button' className="w-1/2 p-4 laptop:p-5 items-center border-l border-gray-600 hover:bg-slate-600 active:bg-slate-500">
        <img src="./imgs/favourites_icon.svg" alt="" />
      </button>
      <button type='button' className="w-1/2 p-4 laptop:p-5 border-l border-gray-600 items-center hover:bg-slate-600 active:bg-slate-500">
        <img src="./imgs/shopping_cart.svg" alt="" />
      </button>
    </div>
  </div>
);

