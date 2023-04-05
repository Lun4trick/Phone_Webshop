import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Footer } from './Components/Footer';
import { Header } from "./Components/Header"
import { BurgerMenu } from './Components/BurgerMenu';
import { HomePage } from './Components/HomePage';
import { loadPhones } from './features/PhonesSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const phones = useAppSelector(state => state.allPhones.phones);

  const onMenuAction = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 639) {
        setIsMenuOpen(false);
      }
    });

    dispatch(loadPhones());

    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth > 639) {
          setIsMenuOpen(false);
        }
      });
    }
  }, [])

  useEffect(() => {
    console.log(phones);
  }, [phones]);

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
      <Footer/>
    </main>
  );
}

export default App;
