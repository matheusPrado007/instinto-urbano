import React, { useEffect, useState } from 'react';
import { useParams,  useNavigate  } from 'react-router-dom';
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
import Slider from 'react-slick';
import { CustomNextArrow, CustomPrevArrow } from './BtnComponent';
import {decrypt} from '../utils/encrypt'

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
interface Arte {
  _id: string;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string;
}

interface GaleriaItem extends Arte { }

const ProfilePage: React.FC = () => {
  const { id, userId } = useParams<{ id?: string, userId?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [larguraTotal, setLarguraTotal] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedArte, setSelectedArte] = useState<Arte | null>(null);

  const { dadosUsers, dadosArtes } = useApi();

  useEffect(() => {
      let foundUser;
    const urlAtual = window.location.href;
    if (decrypt(id)) {
      if (userId) {
        foundUser = dadosUsers.find((u) => u._id === userId);
      } else {
        foundUser = dadosUsers.find((u) => u._id === decrypt(id));
      }

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }, [decrypt(id), dadosUsers]);

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
      // Render
      const userData = dadosUsers.find((u) => u._id === decrypt(id)) || null;
      const filteredArtes = dadosArtes.filter((arte) => arte.nome_artista.toLocaleUpperCase().includes(userData?.username.toLocaleUpperCase()));
      console.log(filteredArtes);
  
      // Effects
      useEffect(() => {
          const handleResize = async () => {
            const numeroDeImgs = window.innerWidth / 160;
           
      
            const numeroTotal = +numeroDeImgs.toFixed(0) < filteredArtes.length ? numeroDeImgs : filteredArtes.length - 1
         
      
            const resulNumber = +numeroTotal === 0 ? 1 : +numeroTotal;
          
            
            const finalResult = +resulNumber.toFixed(0) > 6 ? 5 : +resulNumber
      
            setLarguraTotal(+finalResult.toFixed(0));
          };
      
          window.addEventListener('resize', handleResize);
          handleResize();
      
          const timeout = setTimeout(() => {
            setIsLoading(false);
          }, 1300);
      
          return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout);
          };
        }, [filteredArtes.length]);
  
      // Other Functions
      const handleArteClick = (arteId: string) => {
          const clickedArte = dadosArtes.find((arte) => arte._id === arteId);
          setSelectedArte(clickedArte || null);
  
      navigate(`arte/${arteId}/admartist`);
      };
  
  
      const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: larguraTotal,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
      };
  
      if (!user) {
          return null;
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
      <section>
                    <p className="title-profile-artist">Artes de {user.username}</p>
                    <Slider {...settings} className="galeria">
                        {filteredArtes.map((item: GaleriaItem) => (
                            <div key={item._id} className="galeria-item" onClick={() => handleArteClick(item._id)}>
                                <img src={item.foto} className="imagem-galeria" alt={`Arte de ${item.nome_artista}`} />
                                <p className="nome-trabalho">{item.nome}</p>
                                <p className="nome-artista">{item.nome_artista}</p>
                                <p className="nome-trabalho">{item.endereco}</p>
                            </div>
                        ))}
                    </Slider>
                </section>
      <Footer />
    </div>
  );
};

export default ProfilePage;
