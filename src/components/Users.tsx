// UserList.tsx

import React from 'react';
import { useApi } from '../services/context/ApiContext';
import '../styles/Users.css';

const UserList: React.FC = () => {
  const { dadosUsers } = useApi();

  return (
    <div className="user-list-container">
      <p className="user-list-header">Equipe Principal</p>
      <div className="user-grid">
        {dadosUsers.map((user) => (
          <div key={user.id} className="user-item">
            <img src={user.foto_perfil} alt={user.nome} className="user-avatar" />
            <span className='nome-user'>{user.username}</span>
            <span>{user.descricao_perfil}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
