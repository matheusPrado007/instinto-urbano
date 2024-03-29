// Loading.tsx

import React from 'react';
import '../styles/Loading.css';  
import logo from '../assets/logo01.png';  

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <img src={logo} alt="Logo" className="loading-logo" />
      <p className="loading-text">Carregando...</p>
    </div>
  );
};

export default Loading;
