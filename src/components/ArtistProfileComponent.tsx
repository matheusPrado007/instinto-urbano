import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Altere aqui
import { useApi } from '../services/context/ApiContext';
import '../styles/Profile.css';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Loading from './LoadingComponent';
import HeaderAdmin from './HeaderAdmin';

interface User {
  _id: number;
  username: string;
  foto_capa: string;
  foto_perfil: string;
  descricao_perfil: string;
}

const ArtistProfileComponent: React.FC = () => {
  const navigate = useNavigate(); // Altere aqui
  const { id, userId } = useParams<{ id?: string; userId?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const { dadosUsers } = useApi();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (id) {
      const foundUser = dadosUsers.find((u) => u._id === userId);

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }, [id, dadosUsers]);

  const handleBackButtonClick = () => {
    // Navegar de volta à página anterior
    navigate(-1); // Altere aqui
  };

  const headerOrHeaderAdm = () => {
    const urlAtual = window.location.href;
    if (urlAtual.includes(`artistprofile`)) {
      return true;
    }
  }

  return (
    <div>
      {headerOrHeaderAdm() ? <HeaderAdmin /> : <Header />}
      {isLoading && <Loading />}
      <div className="profile-container">
        {/* Adicionando o botão de voltar */}
        <button onClick={handleBackButtonClick} className="profile-edit-finish">
          Voltar
        </button>
        {user ? (
          <div>
            <img src={user.foto_capa} alt={`Capa de ${user.username}`} className="cover-photo" />
            <div className='description-data'>
              <img src={user.foto_perfil} alt={`Foto de perfil de ${user.username}`} className="profile-photo" />
              <p className='responsibility-p'>Co-fundador do Rastro Urbano</p>
            </div>
            <div className="user-info">
              <p>{user.username}</p>
            </div>
            <div className='description-p'>
              <p>{user.descricao_perfil}</p>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArtistProfileComponent;
