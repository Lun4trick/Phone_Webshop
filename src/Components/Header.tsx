import React, { useState } from 'react';
import NavBar from './NavBar/NavBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex bg-slate-900 justify-between tablet:justify-start h-fit border-b border-gray-600">
      <div className="p-4 laptop:px-6">
        <img className="h-5 w-16 laptop:h-7 laptop:w-20" src="./imgs/logo.svg" alt="Logo" />
      </div>
      <nav className="flex justify-between grow">
        <NavBar />
      </nav>
      <button 
        type='button' 
        className="p-4 border-l border-gray-600 tablet:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img 
          className={`${ isMenuOpen
            ? 'rotate-90'
            : 'rotate-0'} 
            transition-all`
          } 
          src={
            isMenuOpen
              ? './imgs/mobile_close_menu.svg'
              : './imgs/mobile_open_menu.svg'} 
          alt="" 
        />
      </button>
    </header>
  );
}

export default Header;