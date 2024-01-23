
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/ArtistList.css';
import { useParams } from 'react-router-dom';



const ArtistList: React.FC = () => {
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
      navigate(`/profileartist/${userId}`);
  }

    const adm = dadosUsers && dadosUsers.filter((user) => user.administrador === false)

  useEffect(() => {
    setIdPrams(id);
 
  }, [id])

  return (
    <>
    <div className="user-list-container-artist">
      <p className="user-list-header-artist">Conheça os Artistas</p>
      <div className="user-grid-artist">
        {adm && adm.map((user: any) => (
          <div key={user._id} className="user-item-artist clicavel-artist" onClick={() => navigateToProfile(user._id)}>
            <img src={user.foto_perfil} alt={user.username} className="user-avatar-artist" />
            <span className='nome-user-artist'>{user.username}</span>
            <span>
            {user.descricao_curta}
            </span>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ArtistList;
