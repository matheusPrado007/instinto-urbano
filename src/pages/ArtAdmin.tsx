// AdmUser.tsx
import React from 'react';
import { useApi } from '../services/context/ApiContext';
import Footer from '../components/Footer';
import HeaderAdmin from '../components/HeaderAdmin';
import Header from '../components/Header';
import Loading from '../components/Loading';

const ArtAdmin: React.FC = () => {
  const { fazerLogin, dadosArtes } = useApi();
  

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
      {dadosArtes.length <= 0 && <Loading />} 
      <HeaderAdmin />
      <div className="content">
        <h2>Página do Administrador - Arte</h2>

      </div>
      <Footer />
    </>
  );
};

export default ArtAdmin;
