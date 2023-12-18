// src/components/common/Header.tsx
import React, { useState } from 'react';
import '../styles/Header.css';

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
        <h1 className="titulo-esquerda">Rastro Urbano</h1>
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
