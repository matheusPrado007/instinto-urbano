import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import Galeria from '../../components/GaleriaComponent';
import Maps from '../../services/Maps';
import UserList from '../../components/UsersComponent';

import { useApi } from '../../services/context/ApiContext';
import Loading from '../../components/LoadingComponent';

import '../../styles/Home.css';
import ArtistList from '../../components/ArtistListComponent';
import HeaderLoginComponent from '../../components/HeaderLoginComponent';



const Home: React.FC = () => {
  const { dadosArtes } = useApi();
  const navigate = useNavigate();


  const redirecionarParaSobre = () => {
    navigate('/sobre');
  };

  const headerOrHeaderLogin = () => {
    const urlAtual = window.location.href;
    if (urlAtual.includes(`in`)) {
      return <HeaderLoginComponent />
    }
      return <Header />
  }


  return (
    <>
      {headerOrHeaderLogin()}
      {dadosArtes && dadosArtes.length > 0 ? (
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
                  <p className='titulo-sobre'>Descubra 'Instinto Urbano'</p>
                  <p className="intro-text">
                    Onde a paixão pela arte urbana ganha vida. Em nosso santuário virtual, proporcionamos uma experiência envolvente, revelando emoções e visuais únicos de cada obra nas ruas brasileiras.
                  </p>
                  <p className="intro-text">
                    Explore o legado de artistas extraordinários, que deixam sua marca por todo o país. 'Instinto Urbano' vai além de uma plataforma; é um portal apaixonado que conecta admiradores à riqueza da expressão artística urbana.
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
