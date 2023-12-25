// UserList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Users.css';

const UserList: React.FC = () => {
  const { dadosUsers } = useApi();
  const navigate = useNavigate(); 

  const navigateToProfile = (userId: number) => {
    navigate(`/profile/${userId}`); 
  };

  return (
    <div className="user-list-container">
      <p className="user-list-header">Equipe de Criação</p>
      <div className="user-grid">
        {dadosUsers.map((user) => (
          <div key={user._id} className="user-item clicavel" onClick={() => navigateToProfile(user._id)}>
            <img src={user.foto_perfil} alt={user.nome} className="user-avatar" />
            <span className='nome-user'>{user.username}</span>
            <span>Desenvolvedo Web Full Stack</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
