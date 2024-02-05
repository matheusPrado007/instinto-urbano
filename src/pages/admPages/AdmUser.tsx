// AdmUser.tsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../services/context/ApiContext';
import Footer from '../../components/FooterComponent';
import HeaderAdmin from '../../components/HeaderAdmin';
import Header from '../../components/HeaderComponent';
import UserList from '../../components/UsersComponent';
import Galeria from '../../components/GaleriaComponent';
import Loading from '../../components/LoadingComponent';
import ProfilePage from '../../components/ProfileComponent';
import { useParams } from 'react-router-dom';


const AdmUser: React.FC = () => {
  const { id, userId } = useParams<{ id?: string, userId?: string }>();

  const { fazerLogin } = useApi();
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
    <div className='art-admin-container'>
      <ProfilePage />
    </div>
    </>
  );
};

export default AdmUser;
