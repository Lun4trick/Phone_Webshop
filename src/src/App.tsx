import React, { useCallback, useState } from 'react';
import './App.css';
import { Footer } from './Components/Footer';
import { Header } from "./Components/Header"
// import { BurgerMenu } from './Components/Header/NavBar/BurgerMenu';
import { HomePage } from './Components/HomePage';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     document.body.classList.add('overflow-hidden');
  //   } else {
  //     document.body.classList.remove('overflow-hidden');
  //   }
  // }, [isMenuOpen])

  const onMenuAction = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen])
  
  return (
    <main className="min-h-screen bg-[#0F1121]">
      <Header onMenuAction={onMenuAction} isMenuOpen={isMenuOpen}/>
      <HomePage />
      <Footer/>
    </main>
  );
}

export default App;
