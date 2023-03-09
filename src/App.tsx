import React from 'react';
import './App.css';
import { Footer } from './Components/Footer';
import { Header } from "./Components/Header"
import { HomePage } from './Components/HomePage';

function App() {
  return (
    <main className="min-h-screen bg-[#0F1121]">
      <Header />
      <HomePage />
      <div className='h-[1000px]'>
        fdsaf
      </div>
      <Footer/>
    </main>
  );
}

export default App;
