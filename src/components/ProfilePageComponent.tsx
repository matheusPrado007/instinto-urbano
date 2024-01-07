import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Profile.css';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';

interface User {
  _id: number;
  username: string;
  foto_capa: string;
  foto_perfil: string;
  descricao_perfil: string
}

const ProfilePageEdit: React.FC = () => {
  const { id, userId } = useParams<{ id?: string, userId?: string }>();
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
      const foundUser = dadosUsers.find((u) => u._id === id);

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }, [id, dadosUsers]);

  return (
    <div>
      <Header />
      {isLoading && <Loading />}
      <div className="profile-container">
        <a href={`/admuser/${userId}`} className='profile-edit-finish'>Voltar</a>
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

export default ProfilePageEdit;
