// src/pages/Home.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css'


const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container">
      <p>Arte de rua.</p>
      <div className="input-container">
        <input type="text" className="inputField" placeholder="Pesquisar..." />
        <div className="search-icon">
        <img src="/lupa.png"  alt="Ícone de Lupa" />
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Home;
