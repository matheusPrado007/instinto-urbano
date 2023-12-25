import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useHistory

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';
import Galeria from '../components/Galeria';
import Maps from '../services/Maps';
import { useApi } from '../services/context/ApiContext';
import Loading from '../components/Loading';

const Home: React.FC = () => {
  const { dadosArtes } = useApi();
  const navigate = useNavigate();

  const redirecionarParaSobre = () => {
    navigate('/sobre');
  };

  return (
    <>
          <Header />
      {dadosArtes.length > 0 ? (
        <>
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
              <Galeria />
            </section>
            <Maps />
            <div className='about-sec'>
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
          </div>
        </>
      ) : (
        <Loading />
        )}
        <Footer />
    </>
  );
};

export default Home;
