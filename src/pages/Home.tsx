// src/pages/Home.tsx
import React from 'react';
// import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApiDataLoader from '../components/ApiDataLoader';
import '../styles/Home.css';

const Home: React.FC = () => {

  // const SobreBtn = () => {
    // const history = useHistory();
  
    // const redirecionarParaPaginaSobre = () => {
    //   history.push('/pagina-sobre'); // Substitua '/pagina-sobre' pelo caminho real da sua página
    // };
  
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
          <button className='sobre-btn'>Sobre nós</button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
