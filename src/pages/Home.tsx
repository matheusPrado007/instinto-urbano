// src/pages/Home.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css'
import ApiDataLoader from '../components/ApiDataLoader';


const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container-home">
        <p>Sua comunidade de Arte de Rua.</p>
        <div className="input-container">
          <input type="text" className="inputField" placeholder="Pesquisar..." />
          <div className="search-icon">
            <img src="/lupa.png" alt="Ícone de Lupa" />
          </div>
        </div>
      </div>
      <section>
        <ApiDataLoader />
      </section>
      <Footer />
    </>
  );
};

export default Home;
