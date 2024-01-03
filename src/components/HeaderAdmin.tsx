import React, { useState, useEffect, useRef } from 'react';
import '../styles/HeaderAdmin.css'; 
import logo from '../assets/logo.png';
import { useParams } from 'react-router-dom';

const HeaderAdmin: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { id } = useParams<{ id?: string }>();
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
    <div className='header-admin'>
      <div className="menu-button-admin" onClick={toggleMenu}>
        ☰
      </div>
      <section className="head-1-admin">
        <h1 className="titulo-esquerda-admin">
          <img className="logo-admin" src={logo} alt="Logo Rastro Urbano" />
          <a href="/" className="link-sem-sublinhado-admin">
            Rastro Urbano
          </a>
        </h1>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul className="lista-direita-admin">
            <li><a href={`/admuser/${id}`}>Início</a></li>
            <li><a href={`/admuser/${id}/perfil`}>Meu Perfil</a></li>
            <li><a href={`/admuser/${id}/artistas`}>Artistas</a></li>
            <li><a href={`/admuser/${id}/artes`}>Editar Artes</a></li>
            <li><a href={`/admuser/${id}/profilepost`}>Novo Administrador</a></li>
            <li><a href={`/admuser/${id}/artedit`}>Nova Arte</a></li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default HeaderAdmin;
