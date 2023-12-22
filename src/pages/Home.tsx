// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useHistory

import Header from '../components/Header';
import Footer from '../components/Footer';
import ApiDataLoader from '../services/ApiDataLoader';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate(); // Inicialize o usenavigate

  // Função para redirecionar para a página 'Sobre' ao clicar no botão
  const redirecionarParaSobre = () => {
    navigate('/sobre'); // Substitua '/sobre' pelo caminho real da sua página 'Sobre'
  };

  
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="container-home">
          <p>Sua comunidade de Arte de Rua.</p>
          <div className="input-container">
            <input type="text" className="inputField" placeholder="Pesquisar..." />
            <div className="search-icon">
              <img src="/lupa.png" alt="Ícone de Lupa" />
            </div>
          </div>
        </div>
        <section className='galeria-home'>
          <ApiDataLoader />
        </section>
        <section className="sobre-section">
          <div className='text-sobre'>
          <p className='titulo-sobre'>Descubra 'Rastro Urbano'</p>
          <p className="intro-text">
             Onde a paixão pela arte urbana ganha vida. Em nosso santuário virtual, proporcionamos uma experiência envolvente, revelando emoções e visuais únicos de cada obra nas ruas brasileiras.
          </p>
          <p className="intro-text">
            Explore o legado de artistas extraordinários, que deixam sua marca por todo o país. 'Rastro Urbano' vai além de uma plataforma; é um portal apaixonado que conecta admiradores à riqueza da expressão artística urbana.
          </p>
          </div>
          <button className='sobre-btn' onClick={redirecionarParaSobre}>Sobre nós</button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
