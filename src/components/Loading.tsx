// Loading.tsx

import React from 'react';
import '../styles/Loading.css';  // Importe ou crie um arquivo CSS para estilizar o componente
import logo from '../assets/logo.png';  // Importe o caminho do seu logo

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <img src={logo} alt="Logo" className="loading-logo" />
      <p className="loading-text">Carregando...</p>
    </div>
  );
};

export default Loading;
