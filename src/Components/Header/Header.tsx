import React from 'react';
import NavBar from '../NavBar/NavBar';
import { NavLink } from 'react-router-dom';

type Props = {
  isMenuOpen: boolean;
  onMenuAction: () => void;
};

export const Header: React.FC<Props> = ({ isMenuOpen, onMenuAction }) => (
  <header id='header' className='flex mb-8 bg-Phone-Black justify-between tablet:justify-start h-fit border-b border-Surface-2 sticky top-0'>
    <NavLink
      to='/'
      className='p-4 laptop:px-6 laptop:pr-8'>
      <img
        className='h-5 w-16 laptop:h-7 laptop:w-20'
        src={`${process.env.PUBLIC_URL!}/imgs/logo.svg`}
        alt='Logo'
      />
    </NavLink>
    <nav className='flex justify-between grow' role='navigation'>
      <NavBar />
    </nav>
    <button
      type='button'
      className='p-4 border-l border-Surface-2 tablet:hidden'
      onClick={onMenuAction}
    >
      <img
        className={`${isMenuOpen
          ? 'rotate-90'
          : 'rotate-0'} 
          transition-all`
        }
        src={
          isMenuOpen
            ? `${process.env.PUBLIC_URL!}/imgs/mobile_close_menu.svg`
            : `${process.env.PUBLIC_URL!}/imgs/mobile_open_menu.svg`}
        alt=''
      />
    </button>
  </header>
);
