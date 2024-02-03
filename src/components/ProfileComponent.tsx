import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/Profile.css';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Loading from './LoadingComponent';
import InstagramLogo from '../assets/instagram.png'; 
import LinkedInLogo from '../assets/linkedin.png'; 
import EmailLogo from '../assets/email.png'; 
import HeaderAdmin from './HeaderAdmin';
import HeaderArtist from './HeaderArtist';

interface User {
  _id: number;
  username: string;
  foto_capa: string;
  foto_perfil: string;
  descricao_perfil: string;
  email: string;
  linkedin: string;
  instagram: string;
}

const ProfilePage: React.FC = () => {
  const { id, userId } = useParams<{ id?: string, userId?: string }>();
  const [user, setUser] = useState<User | null>(null);


  const { dadosUsers } = useApi();

  useEffect(() => {
      let foundUser;
    const urlAtual = window.location.href;
    if (id) {
      if (userId) {
        foundUser = dadosUsers.find((u) => u._id === userId);
      } else {
        foundUser = dadosUsers.find((u) => u._id === id);
      }

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }, [id, dadosUsers]);

  const headerOrHeaderAdm = () => {
    const urlAtual = window.location.href;
    if (urlAtual.includes(`artist`)) {
      return <HeaderArtist />
    }
    if (urlAtual.includes(`adm`)) {
      return <HeaderAdmin />
    } else {
      return <Header />
    }
  }

  return (
    <div>
      {headerOrHeaderAdm()}

      <div className="profile-container">
        {user && (
          <div>
            <img src={user.foto_capa} alt={`Capa de ${user.username}`} className="cover-photo" />
            <div className='description-data'>
              <img src={user.foto_perfil} alt={`Foto de perfil de ${user.username}`} className="profile-photo" />
              <p className='responsibility-p'>Co-fundador do Rastro Urbano</p>
            </div>
            <div className="user-info">
            <div className="social-links">
              <a href={`mailto:${user.email}`}>
                <img src={EmailLogo} alt="E-mail" className="social-logo-profile" />
              </a>
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <img src={LinkedInLogo} alt="LinkedIn" className="social-logo-profile" />
              </a>
              <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                <img src={InstagramLogo} alt="Instagram" className="social-logo-profile" />
              </a>
            </div>
              <p>{user.username}</p>
            </div>
            <div className='description-p'>
              <p>{user.descricao_perfil}</p>
            </div>
            
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
