import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './Components/Footer';
import { Header } from "./Components/Header"
import { BurgerMenu } from './Components/BurgerMenu';
import { HomePage } from './Components/HomePage';
import { loadPhones } from './features/PhonesSlice';
import { useAppDispatch } from './app/hooks';
import ProductPage from './Components/ProductPage/ProductsPage';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

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
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen])
  
  return (
    <div className="min-h-screen min-w-[264px] flex flex-col m-0 bg-Phone-Black">
      <Header onMenuAction={onMenuAction} isMenuOpen={isMenuOpen}/>
      <BurgerMenu isMenuOpen={isMenuOpen} />
      <main className='px-4 tablet:px-6 desktop:px-8'>
        <Routes>
          <Route
            path="/home"
            element={(
              <Navigate
                to="/"
                replace
              />
            )} 
          />
          
          <Route
            path="/"
            element={
              <HomePage />
            }
          />

          <Route
            path="/phones"
            element={
              <ProductPage />
            }
          />

          <Route
            path="*"
            element={
              <h1 className="h-full text-6xl text-Phone-white">
                Page not found
              </h1>
            }
          />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
