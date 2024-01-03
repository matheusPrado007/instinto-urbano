import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (event: MouseEvent) => {
    if (menuRef.current && (menuRef.current as HTMLElement).contains(event.target as HTMLElement)) {
      return;
    }
    
    setMenuOpen(false);
  };
  


  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

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
        <nav ref={menuRef} className={isMenuOpen ? 'open' : ''}>
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
