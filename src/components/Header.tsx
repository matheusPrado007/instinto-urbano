import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../utils/_a752ab83-43c3-4202-84fd-3e9d1d8971c2-removebg-preview.png'; // Substitua pelo caminho real da sua imagem


const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="menu-button" onClick={toggleMenu}>
        ☰
      </div>
      <section className="head-1">
        <h1 className="titulo-esquerda"><img className="logo" src={logo} alt="Logo Rastro Urbano" /> Rastro Urbano</h1>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul className="lista-direita">
            <li><a href="/">Página Inicial</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/artistas">Artistas</a></li>
            <li><a href="/artes">Artes</a></li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
