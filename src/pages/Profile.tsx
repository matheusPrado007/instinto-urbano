import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Profile.css'; 

interface User {
  _id: number;
  username: string;
  foto_capa: string;
  foto_perfil: string;
}

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const { dadosUsers } = useApi();

  useEffect(() => {
    if (userId) {
      const foundUser = dadosUsers.find((u) => u._id === userId);

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }, [userId, dadosUsers]);

  return (
    <div className="profile-container">
      {user ? (
        <div>
          <img src={user.foto_capa} alt={`Capa de ${user.username}`} className="cover-photo" />
          <img src={user.foto_perfil} alt={`Foto de perfil de ${user.username}`} className="profile-photo" />
          <div className="user-info">
            <h2>{user.username}</h2>
          </div>
        </div>
      ) : (
        <p className="loading-message">Carregando...</p>
      )}
    </div>
  );
};

export default ProfilePage;
