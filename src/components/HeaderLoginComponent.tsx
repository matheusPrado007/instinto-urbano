import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo01.png';
import { useNavigate, useParams } from 'react-router-dom';
import imgLogin from '../assets/user.png';
import { useApi } from '../services/context/ApiContext';


const HeaderLoginComponent: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id?: string }>();
  const { dadosUsers } = useApi();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const closeMenu = (event: MouseEvent) => {
    if (menuRef.current && buttonRef.current) {
      if (!menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setSubMenuOpen(false); // Fechar o submenu quando o menu principal é fechado
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

  const redirecionarParaadm = () => {
    const userAdm = dadosUsers.find((user) => user._id === id);
    const isAdm = userAdm.administrador
    console.log('usuarioadm', isAdm);
    if(isAdm) {
      navigate(`/admuser/${id}`);
    }else {
      navigate(`/admartist/${id}`);
    }
  };

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
          <a href={`/in/${id}`} className="link-sem-sublinhado">
            Instinto Urbano
          </a>
        </h1>
        <nav ref={menuRef} className={isMenuOpen ? 'open' : ''}>
          <ul className="lista-direita">
            <li onClick={() => redirecionarParaSobre(`/in/${id}`)} className='header-list-hover'>Página Inicial</li>
            <li onClick={() => redirecionarParaSobre(`/sobre/in/${id}`)} className='header-list-hover' >Sobre</li>
            <li onClick={() => redirecionarParaSobre(`/artistas/in/${id}`)} className='header-list-hover' >Artistas</li>
            <li onClick={() => redirecionarParaSobre(`/artes/in/${id}`)} className='header-list-hover' >Artes</li>
            <li className="header-list-hover" onClick={() => redirecionarParaadm()}><img className='header-login-icon' src={imgLogin} alt="imagem login" /></li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default HeaderLoginComponent;
