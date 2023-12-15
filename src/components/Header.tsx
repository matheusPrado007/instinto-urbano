// src/components/common/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      {/* Conteúdo do header, como logotipo, links, etc. */}
      <h1>Rastro Urbano</h1>
      <nav>
        <ul>
          <li><a href="/">Página Inicial</a></li>
          <li><a href="/sobre">Sobre</a></li>
          {/* Adicione mais links conforme necessário */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
