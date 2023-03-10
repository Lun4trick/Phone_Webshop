import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Footer } from './Components/Footer';
import { Header } from "./Components/Header"
import { BurgerMenu } from './Components/Header/NavBar/BurgerMenu';
import { HomePage } from './Components/HomePage';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuAction = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 639) {
        setIsMenuOpen(false);
      }
    });

    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth > 639) {
          setIsMenuOpen(false);
        }
      });
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen])
  
  return (
    <main className="min-h-screen flex flex-col m-0 bg-[#0F1121]">
      <Header onMenuAction={onMenuAction} isMenuOpen={isMenuOpen}/>
      <BurgerMenu isMenuOpen={isMenuOpen} />
      <HomePage />
      <div className="relative h-[2000px]">
        asfasdfas
      </div>
      <Footer/>
    </main>
  );
}

export default App;
