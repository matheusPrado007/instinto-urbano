// UserList.tsx

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Users.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


const UserList: React.FC = () => {
  const { dadosUsers } = useApi();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<any>();
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

    const adm = dadosUsers.filter((user) => user.administrador === false)

  useEffect(() => {
    setIdPrams(id);
 
  }, [id])

  return (
    <>
    <Header />
    <div className="user-list-container">
      <p className="user-list-header">Conheça os Artistas</p>
      <div className="user-grid">
        {adm && adm.map((user: any) => (
          <div key={user._id} className="user-item clicavel" onClick={() => navigateToProfile(user._id)}>
            <img src={user.foto_perfil} alt={user.nome} className="user-avatar" />
            <span className='nome-user'>{user.username}</span>
            <span>
            {user.descricao_perfil}
            </span>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default UserList;
