import React, { useState, useEffect, useRef } from 'react';
import '../styles/HeaderAdmin.css'; 
import logo from '../assets/logo01.png';
import { useParams } from 'react-router-dom';
import { decrypt } from '../utils/Crypto';


const HeaderAdmin: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className='header-admin'>
      <div className="menu-button-admin" ref={buttonRef} onClick={toggleMenu}>
        ☰
      </div>
      <section className="head-1-admin">
        <h1 className="titulo-esquerda-admin">
          <img className="logo-admin" src={logo} alt="Logo Instinto Urbano" />
          <a href={`/in/${decrypt(id as string)}`} className="link-sem-sublinhado-admin">
            Instinto Urbano
          </a>
        </h1>
        <nav ref={menuRef} className={isMenuOpen ? 'open' : ''}>
          <ul className="lista-direita-admin">
            <li><a href={`/admuser/${id}`}>Início</a></li>
            <li><a href={`/admuser/${id}/perfil`}>Meu Perfil</a></li>
            <li><a href={`/admuser/${id}/artistas`}>Artistas</a></li>
            <li><a href={`/admuser/${id}/artes`}>Editar Artes</a></li>
            <li><a href={`/admuser/${id}/profilepost`}>Novo Administrador</a></li>
            <li><a href={`/admuser/${id}/artepost`}>Nova Arte</a></li>
            <li><a href={`/`}>Sair</a></li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default HeaderAdmin;
