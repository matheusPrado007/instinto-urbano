// AdmUser.tsx
import React from 'react';
import { useApi } from '../services/context/ApiContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdmUser: React.FC = () => {
  const { fazerLogin } = useApi();

  const isAdmin = async ({ email, senha }: any) => {
    try {
      const { accessToken, refreshToken } = await fazerLogin({ email, senha });
      if (accessToken && refreshToken) {
        return true
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  if (!isAdmin) {
    return (
      <>
        <Header />
        <div className="content">
          <p>Você não tem permissão para acessar esta página.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="content">
        <h2>Página do Administrador</h2>
        {/* Conteúdo específico para administradores aqui */}
      </div>
      <Footer />
    </>
  );
};

export default AdmUser;
