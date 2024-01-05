import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';
import logo from '../assets/logo.png';
import Galeria from '../components/Galeria';
import UserList from '../components/Users';
import { useApi } from '../services/context/ApiContext';
import Loading from '../components/Loading';




const About: React.FC = () => {
  const { dadosUsers } = useApi();



  return (
    <>
      <Header />
      {dadosUsers.length > 0 ? (
        <div>
      <section className='about-section'>
        <p className='about-h2'> Rastro Urbano</p>
        <p className='about-p'>
          Onde as ruas ganham vida e a paixão pela arte urbana é celebrada. Em nosso santuário virtual,
          criamos uma experiência envolvente que revela as emoções e visuais de cada obra nas ruas brasileiras.
        </p>
        <p className='about-p'>
          Descubra o legado de artistas extraordinários que deixam seu "Rastro Urbano" por todo o país.
          Nosso site é mais que uma plataforma; é um portal apaixonado que conecta admiradores à riqueza da
          expressão artística urbana.
        </p>
        <p className='about-p'>
          Dos grandes murais a artistas visionários, o "Rastro Urbano" destaca não apenas a localização
          exata de cada obra-prima, mas também revela os bastidores, inspirações e sonhos que impulsionam
          cada criação. Mergulhe nessa jornada onde cada clique revela a alma vibrante de nossas cidades.
        </p>
        <p className='about-p'>
          Sinta a pulsação das ruas, apaixone-se pela criatividade que colore nosso cotidiano e deixe o
          "Rastro Urbano" guiá-lo por um mundo de beleza efervescente. Este é mais que um site; é o convite
          para explorar, se encantar e se perder na fascinante tapeçaria da cultura urbana brasileira.
        </p>
      </section>
      <div className='container-logo'>
        <img src={logo} alt="logo" className='logo-about' />
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
