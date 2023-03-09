import React from 'react';
import './App.css';
import { Header } from "./Components/Header"
import { HomePage } from './Components/HomePage';

function App() {
  return (
    <main className="min-h-screen bg-[#0F1121]">
      <Header />
      <HomePage />
    </main>
  );
}

export default App;
