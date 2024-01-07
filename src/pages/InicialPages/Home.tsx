import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Galeria from '../../components/Galeria';
import Maps from '../../services/Maps';
import UserList from '../../components/Users';

import { useApi } from '../../services/context/ApiContext';
import Loading from '../../components/Loading';

import '../../styles/Home.css';
import ArtistList from '../../components/ArtistList';



const Home: React.FC = () => {
  const { dadosArtes } = useApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
            </div>            
            <section className='galeria-home'>
              <Galeria />
            </section>
            <section className='section-middle'>
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
            </section>
          </div>
          <section>
            <ArtistList />
          </section>
          <section className='users-list-home'>
            <UserList />
          </section>
        </>
      ) : (
        <Loading />
        )}
        <Footer />
    </>
  );
};

export default Home;
