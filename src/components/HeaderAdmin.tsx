import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import { useParams } from 'react-router-dom';


const HeaderAdmin: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { id } = useParams<{ id?: string }>();
 

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };



  return (
    <header>
      <div className="menu-button" onClick={toggleMenu}>
        ☰
      </div>
      <section className="head-1">
      <a href="/" className='link-sem-sublinhado'>
        <h1 className="titulo-esquerda"><img className="logo" src={logo} alt="Logo Rastro Urbano" /> 
       Rastro Urbano
        </h1>
        </a>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul className="lista-direita">
            <li><a href={`/admuser/${id}/perfil`}>Perfil</a></li>
            <li><a href={`/admuser/${id}/artistas`}>Artistas</a></li>
            <li><a href={`/admuser/${id}/artes`}>Artes</a></li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default HeaderAdmin;
