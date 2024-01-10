import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo01.png';

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };



  return (
    <div className='header'>
      <div className="menu-button" onClick={toggleMenu}>
        ☰
      </div>
      <section className="head-1">
        <h1 className="titulo-esquerda">
          <img className="logo" src={logo} alt="Logo Rastro Urbano" />
          <a href="/" className="link-sem-sublinhado">
            Rastro Urbano
          </a>
        </h1>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul className="lista-direita">
            <li><a href="/">Página Inicial</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/artistas">Artistas</a></li>
            <li><a href="/artes">Artes</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Header;
