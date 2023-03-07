import React from 'react';
import { NavLink } from 'react-router-dom'
import NavItems from './NavItems';

const NavBar: React.FC = () => (
  <>
    <ul className="hidden text-slate-100 text-xs text-center gap-4 tablet:flex">
      {NavItems.map(item => (
        <NavLink 
          key={item.path}
          to={item.path}
          className="flex items-center border-b-2 border-transparent hover:border-white transition-all duration-300"
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
    <div className="tablet:flex hidden">
      <button type='button' className="tablet:flex p-4 laptop:p-5 items-center border-l border-gray-600 hover:bg-slate-600 active:bg-slate-500">
        <img src="./imgs/favourites_icon.svg" alt="" />
      </button>
      <button type='button' className="tablet:flex p-4 laptop:p-5 border-l border-gray-600 items-center hover:bg-slate-600 active:bg-slate-500">
        <img src="./imgs/shopping_cart.svg" alt="" />
      </button>
    </div>
  </>
  
);

export default NavBar