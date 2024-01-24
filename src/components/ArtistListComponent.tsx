
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/ArtistList.css';
import { useParams } from 'react-router-dom';
import { CustomNextArrow, CustomPrevArrow } from './BtnComponent';
import Slider from 'react-slick';



const ArtistList: React.FC = () => {
  const { dadosUsers } = useApi();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<any>();
  const [idParams, setIdPrams] = useState<any>();
  const [larguraTotal, setLarguraTotal] = useState(100);

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

  useEffect(() => {
    const larguraDaTela = window.innerWidth;
    const handleResize = () => {
      const larguraOriginalDaImagem = 150;
      const numeroMaximoDeImagens = 5;

      const quantidadeDeImgsPorTela = larguraDaTela / larguraOriginalDaImagem;
    
      const numeroTotal = larguraDaTela / adm.length;
      
        const numeroDeImgsSemFiltro = Math.min(Math.floor(larguraDaTela / larguraOriginalDaImagem), numeroMaximoDeImagens);
    

      console.log('numeroTotal',+numeroTotal.toFixed(0));
      const numero = Math.min(Math.floor(larguraDaTela / +numeroTotal.toFixed(0)), numeroMaximoDeImagens);
      console.log('num',numero);
      
      const realNumero = adm.length < quantidadeDeImgsPorTela ? numero : numeroDeImgsSemFiltro;
      console.log('realNumero', realNumero);
      
  
      setLarguraTotal(realNumero);
    };
  
    window.addEventListener('resize', handleResize);
    handleResize();
  
    // const timeout = setTimeout(() => {
    //   setIsLoading(false);
    // }, 1300);
  
    return () => {
      window.removeEventListener('resize', handleResize);
      // clearTimeout(timeout);
    };
  }, [adm.length, window.innerWidth]);


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

  return (
    <>
      <div className="user-list-container-artist">
        {/* {isLoading && <Loadin />} */}
        {adm && adm.length === 0 && <p className="galeria-item">Nenhuma arte encontada</p>}
        <p className="user-list-header-artist">Conheça os Artistas</p>
        <div className='galeria-artist-list-container'>
        <Slider {...settings} className='galeria'>
          {adm.map((item: any) => (
            <div key={item._id}  className="galeria-item"  onClick={() => navigateToProfile(item._id)}>
              <img
                src={item.foto_perfil}
                className="user-avatar-artist"
                alt={`Arte de ${item.username}`}
              />
              <p className='nome-user-artist'>{item.username}</p>
              <span className='nome-user-artist'>
             {item.descricao_curta}
             </span>
            </div>
          ))}
        </Slider>
        </div>
      </div>
    </>
  );
};

export default ArtistList;
