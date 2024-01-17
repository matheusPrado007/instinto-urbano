import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Users.css';
import { useParams } from 'react-router-dom';

const UserList: React.FC = () => {
  const { dadosUsers } = useApi();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<any>([]);
  const [idParams, setIdParams] = useState<string | undefined>(id);

  const navigateToProfile = (userId: string) => {
    if (idParams) {
      if (idParams === userId) {
        return navigate(`/admuser/${userId}/perfil`);
      }
      return navigate(`admuser/${userId}/perfiladm`);
    }
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    setIdParams(id);
  }, [id]);

  useEffect(() => {
    const admUsers = dadosUsers.filter((user) => user.administrador === true);
    setUser(admUsers);
  }, [dadosUsers]);

  return (
    <div className="user-list-container">
      <p className="user-list-header">Equipe de Criação</p>
      <div className="user-grid">
        {user.map((user: any) => (
          <div key={user._id} className="user-item clicavel" onClick={() => navigateToProfile(user._id)}>
            <img src={user.foto_perfil} alt={user.nome} className="user-avatar" />
            <span className='nome-user'>{user.username}</span>
            <span>
              • Desenvolvedor Web Full Stack
            </span>
            <span>
              • Co-fundador do Rastro Urbano
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
