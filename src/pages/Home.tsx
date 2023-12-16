// src/pages/Home.tsx
import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div>
        <p>Bem-vindo à página inicial!</p>
      </div>
    </div>
  );
};

export default Home;
