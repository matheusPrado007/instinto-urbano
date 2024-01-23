import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo01.png';
import { useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (event: MouseEvent) => {
    if (menuRef.current && buttonRef.current) {
      if (!menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
  };

  const handleButtonClick = () => {
    toggleMenu();
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', closeMenu);
    } else {
      document.removeEventListener('mousedown', closeMenu);
    }

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, [isMenuOpen]);

  const redirecionarParaSobre = (rota: string) => {
    navigate(rota);
  };

  return (
    <div className='header'>
      <div className="menu-button" ref={buttonRef} onClick={handleButtonClick}>
        ☰
      </div>
      <section className="head-1">
        <h1 className="titulo-esquerda">
          <img className="logo" src={logo} alt="Logo Instinto Urbano" />
          <a href="/" className="link-sem-sublinhado">
            Instinto Urbano
          </a>
        </h1>
        <nav ref={menuRef} className={isMenuOpen ? 'open' : ''}>
          <ul className="lista-direita">
            <li onClick={() => redirecionarParaSobre('/')} className='header-list-hover'>Página Inicial</li>
            <li onClick={() => redirecionarParaSobre('/sobre')} className='header-list-hover' >Sobre</li>
            <li onClick={() => redirecionarParaSobre("/artistas")} className='header-list-hover' >Artistas</li>
            <li onClick={() => redirecionarParaSobre("/artes")} className='header-list-hover' >Artes</li>
            <li onClick={() => redirecionarParaSobre("/login")} className='header-list-hover' >Login</li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Header;
