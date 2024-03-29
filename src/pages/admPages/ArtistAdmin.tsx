import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useApi } from '../../services/context/ApiContext';
import Footer from '../../components/FooterComponent';
import HeaderAdmin from '../../components/HeaderAdmin';
import Loading from '../../components/LoadingComponent';

import { CustomNextArrow, CustomPrevArrow } from '../../components/BtnComponent';
import Slider from 'react-slick';


const Artist: React.FC = () => {
  const { dadosUsers } = useApi();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<any>();
  const [idParams, setIdPrams] = useState<any>();
  const [larguraTotal, setLarguraTotal] = useState(100);
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigateToProfile = (userId: string) => {
    navigate(`admuser/${userId}/perfilartistaedit`); 
  }
  
    const adm = dadosUsers && dadosUsers.filter((user) => user.administrador === false)

  useEffect(() => {
    setIdPrams(id);
  }, [id])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


 const filteredArtist = adm && adm.filter((artist) => {
    const searchTermWithoutTilde = searchTerm.replace(/~/g, '');
    const fieldValueWithoutTilde = artist.username.toUpperCase().replace(/~/g, '');

    return fieldValueWithoutTilde.includes(searchTermWithoutTilde.toUpperCase()) || (
      searchTermWithoutTilde.startsWith('~') &&
      fieldValueWithoutTilde.includes(searchTermWithoutTilde.substring(1).toUpperCase())
    );
  });

  useEffect(() => {
    const larguraDaTela = window.innerWidth;
    const handleResize = () => {
      const larguraOriginalDaImagem = 150;
      const numeroMaximoDeImagens = 6;

      const quantidadeDeImgsPorTela = larguraDaTela / larguraOriginalDaImagem;
    
      const numeroTotal = larguraDaTela / filteredArtist.length;
      
        const numeroDeImgsSemFiltro = Math.min(Math.floor(larguraDaTela / larguraOriginalDaImagem), numeroMaximoDeImagens);
    

      console.log('numeroTotal',+numeroTotal.toFixed(0));
      const numero = Math.min(Math.floor(larguraDaTela / +numeroTotal.toFixed(0)), numeroMaximoDeImagens);
      console.log('num',numero);
      
      const realNumero = filteredArtist.length < quantidadeDeImgsPorTela ? numero : numeroDeImgsSemFiltro;
      console.log('realNumero', realNumero);
      
  
      setLarguraTotal(realNumero);
    };
  
    window.addEventListener('resize', handleResize);
    handleResize();
  
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [filteredArtist.length, window.innerWidth]);


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
    <HeaderAdmin />
    <div  className="profile-container" >
    <div className="input-container-adm">

      <input
        type="text"
        className="inputField-adm-artist"
        placeholder={`🔍  Pesquisar por Artistas... `}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      </div>
      {!filteredArtist || filteredArtist.length === 0 && <p className="galeria-item">Nenhuma Artista encontrado</p>}
    <div className="user-list-container-artist">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className="user-list-header-artist">Conheça os Artistas</p>
          <div className='galeria-artist-list-container'>
            <Slider {...settings} className='galeria'>
              {filteredArtist.map((item: any) => (
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
        </>
      )}
    </div>
  </div>
    <Footer />
  </>
  
  );
};


export default Artist;