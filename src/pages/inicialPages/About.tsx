import React from 'react';


import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import '../../styles/About.css';
import Galeria from '../../components/GaleriaComponent';
import UserList from '../../components/UsersComponent';
import { useApi } from '../../services/context/ApiContext';
import Loading from '../../components/LoadingComponent';

import logo from '../../assets/logo02.png';
import HeaderLoginComponent from '../../components/HeaderLoginComponent';





const About: React.FC = () => {
  const { dadosUsers } = useApi();

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
      {dadosUsers && dadosUsers.length > 0 ? (
        <div>
      <section className='about-section'>
        <p className='about-h2'> Instinto Urbano</p>
        <p className='about-p'>
          Onde as ruas ganham vida e a paixão pela arte urbana é celebrada. Em nosso santuário virtual,
          criamos uma experiência envolvente que revela as emoções e visuais de cada obra nas ruas brasileiras.
        </p>
        <p className='about-p'>
          Descubra o legado de artistas extraordinários que deixam seu "Instinto Urbano" por todo o país.
          Nosso site é mais que uma plataforma; é um portal apaixonado que conecta admiradores à riqueza da
          expressão artística urbana.
        </p>
        <p className='about-p'>
          Dos grandes murais a artistas visionários, o "Instinto Urbano" destaca não apenas a localização
          exata de cada obra-prima, mas também revela os bastidores, inspirações e sonhos que impulsionam
          cada criação. Mergulhe nessa jornada onde cada clique revela a alma vibrante de nossas cidades.
        </p>
        <p className='about-p'>
          Sinta a pulsação das ruas, apaixone-se pela criatividade que colore nosso cotidiano e deixe o
          "Instinto Urbano" guiá-lo por um mundo de beleza efervescente. Este é mais que um site; é o convite
          para explorar, se encantar e se perder na fascinante tapeçaria da cultura urbana brasileira.
        </p>
      </section>
      <div className='container-logo'>
        <img src={logo} alt="logo-about" className='logo-about' />
        <UserList />
        <p className='about-h2'>Artes pelo Brasil</p>
        <section>
          <Galeria />
        </section>
      </div>
      </div>) : (
        <Loading />
        )}
        <Footer />
    </>
  );
};

export default About;
