import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Users.css';
import { useParams } from 'react-router-dom';


const UserList: React.FC = () => {
  const { dadosUsers } = useApi();
  const navigate = useNavigate();
  const { id, artistId } = useParams<{ id?: string, artistId?: string }>();
  const [user, setUser] = useState<any>([]);
  const [idParams, setIdParams] = useState<string | undefined>(id);

  const navigateToProfile = (userId: string) => {
    const findUser = dadosUsers.find((user) => user._id === idParams);
    console.log('007',findUser);

    if(findUser && findUser.administrador) {
      navigate(`/profile/in/${userId}/${id}`);
    } else if(findUser && !findUser.administrador) {
      navigate(`/profile/in/${userId}/${id}`);
    } else {
      return navigate(`/profile/${userId}`);
    }

    // else if (idParams) {
    //   if (idParams === userId) {
    //     return navigate(`/admuser/${userId}/perfil`);
    //   }
    //   return navigate(`admuser/${userId}/perfiladm`);
    // }
  };

  useEffect(() => {
    console.log('caiu aqui', dadosUsers);
    
    setIdParams(id);
  }, [id]);

  useEffect(() => {
    const admUsers = dadosUsers && dadosUsers.filter((user) => user.administrador === true);
  
    if (admUsers && !arraysEqual(admUsers, user)) {
      setUser(admUsers);
    }
  }, [dadosUsers, user]);
  
  function arraysEqual(arr1: Array<any>, arr2: Array<any>) {
    if (arr1.length !== arr2.length) return false;
  
    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];
  
      for (let key in obj1) {
        if (obj1[key] !== obj2[key]) return false;
      }
    }
  
    return true;
  }
  
  

  return (
    <div className="user-list-container">
      <p className="user-list-header">Equipe de Criação</p>
      <div className="user-grid">
        {user && user.map((user: any) => (
          <div key={user._id} className="user-item clicavel" onClick={() => navigateToProfile((user._id))}>
            <img src={user.foto_perfil} alt={user.username} className="user-avatar"/>
            <span className='nome-user'>{user.username}</span>
            <span>
              {user.descricao_curta}
            </span>
            <span>
              • Co-fundador do Instinto Urbano
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
