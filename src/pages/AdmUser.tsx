// AdmUser.tsx
import React from 'react';
import { useApi } from '../services/context/ApiContext';
import Footer from '../components/Footer';
import HeaderAdmin from '../components/HeaderAdmin';
import Header from '../components/Header';
import UserList from '../components/Users';
import Galeria from '../components/Galeria';

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
      
      <HeaderAdmin />
      <div className="content">
      <UserList />
      <Galeria />
      </div>
      <Footer />
    </>
  );
};

export default AdmUser;
