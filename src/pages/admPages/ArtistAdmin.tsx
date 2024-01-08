// AdmUser.tsx
import React, { useState, useEffect } from 'react';

import { useApi } from '../../services/context/ApiContext';
import Footer from '../../components/FooterComponent';
import HeaderAdmin from '../../components/HeaderAdmin';
import Header from '../../components/HeaderComponent';
import Loading from '../../components/LoadingComponent';

const ArtistAdmin: React.FC = () => {
  const { fazerLogin, dadosArtes } = useApi();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);


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
        {isLoading && <Loading />}
        <div className="content">
          <p>Você não tem permissão para acessar esta página.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderAdmin />
      {isLoading && <Loading />}
      {dadosArtes.length <= 0 && <Loading />} 
      <div className="content">
        <h2>Página do Administrador - Artista</h2>

      </div>
      <Footer />
    </>
  );
};

export default ArtistAdmin;
