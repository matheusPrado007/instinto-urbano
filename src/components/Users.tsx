// UserList.tsx

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Users.css';
import { useParams } from 'react-router-dom';


const UserList: React.FC = () => {
  const { dadosUsers } = useApi();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [userId, setUserId] = useState();
  const [idParams, setIdPrams] = useState<any>();

  const navigateToProfile = (userId: string) => {

    if(idParams) {
      if (String(idParams) === String(userId)) {
        return navigate(`/admuser/${userId}/perfil`);
      }
      return navigate(`admuser/${userId}/perfiladm`);
    }
      navigate(`/profile/${userId}`);
  }

  useEffect(() => {
    setIdPrams(id)
  }, [id])

  return (
    <div className="user-list-container">
      <p className="user-list-header">Equipe de Criação</p>
      <div className="user-grid">
        {dadosUsers.map((user) => (
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
