import React, { useState, ChangeEvent, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Loading from './LoadingComponent';
import '../styles/ArtAdmin.css'
import { useParams } from 'react-router-dom';
import { CustomNextArrow, CustomPrevArrow } from './BtnComponent';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Galeria.css';
import { useNavigate } from 'react-router-dom';



interface Arte {
  _id: string;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string;
  descricao: string;
  uf: string;
  cidade: string
}
interface GaleriaItem {
  _id: any;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string
}

const Galeria: React.FC = () => {
  const { fazerLogin, dadosArtes, enviarDadosParaBackendArt, dadosUsers } = useApi();
  const { id } = useParams<{ id?: string }>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('nome'); 
  const [selectedArte, setSelectedArte] = useState<Arte | null>(null);
  const [larguraTotal, setLarguraTotal] = useState(100);
  const [isLoading, setIsLoading] = useState(true); 

  const [newId, setNewId] = useState();
  const navigate = useNavigate();

  const isAdmin = async ({ email, senha }: any) => {
    try {
      const { accessToken, refreshToken } = await fazerLogin({ email, senha });
      if (accessToken && refreshToken) {
        return true;
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
    return false;
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchFieldChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchField(event.target.value);
  };

  const handleArteClick = (arteId: number) => {
    setNewId(arteId as any)
    const clickedArte = dadosArtes.find((arte) => arte._id === arteId);
    setSelectedArte(clickedArte || null);
    navigate(`/arte/${arteId}`);
  };

  const filteredArtes = dadosArtes && dadosArtes.filter((arte) => {
    const searchTermWithoutTilde = searchTerm.replace(/~/g, '');
    const fieldValueWithoutTilde = arte[searchField].toUpperCase().replace(/~/g, '');

    // Verifica se o termo de busca está presente no campo, considerando o ~
    return fieldValueWithoutTilde.includes(searchTermWithoutTilde.toUpperCase()) || (
      searchTermWithoutTilde.startsWith('~') &&
      fieldValueWithoutTilde.includes(searchTermWithoutTilde.substring(1).toUpperCase())
    );
  });


  useEffect(() => {
    const larguraDaTela = window.innerWidth;
    const handleResize = () => {
      const larguraOriginalDaImagem = 150;
      const numeroMaximoDeImagens = 5;

      const quantidadeDeImgsPorTela = larguraDaTela / larguraOriginalDaImagem;
    
      const numeroTotal = larguraDaTela / filteredArtes.length;
      
        const numeroDeImgsSemFiltro = Math.min(Math.floor(larguraDaTela / larguraOriginalDaImagem), numeroMaximoDeImagens);
    

      console.log('numeroTotal',+numeroTotal.toFixed(0));
      const numero = Math.min(Math.floor(larguraDaTela / +numeroTotal.toFixed(0)), numeroMaximoDeImagens);
      console.log('num',numero);
      
      const realNumero = filteredArtes.length < quantidadeDeImgsPorTela ? numero : numeroDeImgsSemFiltro;
      console.log('realNumero', realNumero);
      
  
      setLarguraTotal(realNumero);
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
  }, [filteredArtes.length, window.innerWidth]);


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

  if (!isAdmin) {
    return (
      <>
        <Header />
        <div className="content">
          <p>Você não tem permissão para acessar esta página.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container-home-admin">
        <div className="input-container-adm">

          <input
            type="text"
            className="inputField-adm"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img src="/lupa.png" alt="Ícone de Lupa" className="search-icon-adm" />
          <select
            value={searchField}
            onChange={handleSearchFieldChange}
            className="selectField-adm"
          >
            <option value="nome">Nome da Arte</option>
            <option value="nome_artista">Nome do Artista</option>
            <option value="uf">Estado</option>
            <option value="cidade">Cidade</option>
          </select>
        </div>
        {isLoading && <Loading />}
        {filteredArtes && filteredArtes.length === 0 && <p className="galeria-item">Nenhuma arte encontada</p>}
        <Slider {...settings} className='galeria'>
          {filteredArtes.map((item: GaleriaItem) => (
            <div key={item._id} className="galeria-item" onClick={() => handleArteClick(item._id)}>
              <img
                src={item.foto}
                className="imagem-galeria"
                alt={`Arte de ${item.nome_artista}`}
              />
              <p className="nome-trabalho">{item.nome}</p>
              <p className="nome-artista">{item.nome_artista}</p>
              <p className="nome-trabalho">{item.endereco}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Galeria;
