import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Altere aqui
import { useApi } from '../services/context/ApiContext';
import '../styles/ArtPage.css';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Loading from './LoadingComponent';
import iconFechar from '../assets/fechar.png';
import HeaderAdmin from './HeaderAdmin';
import HeaderArtist from './HeaderArtist';

interface GaleriaItem {
  _id: string;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string;
  descricao: string;
  uf: string;
  cidade: string;
}

const ArtPage: React.FC = () => {
  const navigate = useNavigate(); // Altere aqui
  const { arteId } = useParams<{ arteId?: string }>();
  const [art, setArt] = useState<GaleriaItem | null>(null);
  const { dadosArtes } = useApi();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (arteId) {
      const foundArt = dadosArtes.find((u) => u._id === arteId);

      if (foundArt) {
        setArt(foundArt);
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }, [arteId, dadosArtes]);

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  const headerOrHeaderAdm = () => {
    const urlAtual = window.location.href;
    if (urlAtual.includes(`admuser`)) {
      return <HeaderAdmin />
    }
    if (urlAtual.includes(`admartist`)) {
      return <HeaderArtist />
    } else {
      return <Header />
    }
  }


  return (
    <div>
      {headerOrHeaderAdm()}
      {isLoading && <Loading />}
      <div className="art-container-page">
        {art ? (
          <div>
            <div>
              {/* Adicionando a função de clique no botão X */}
              <img
                src={iconFechar}
                alt="icon fechar"
                className="x-back-home"
                onClick={handleBackButtonClick}
              />
              <p className="description-p-art">{art.nome}</p>
            </div>
            <img src={art.foto} alt={`Capa de ${art.nome}`} className="art-photo" />
            <div className="art-descript">
              <p>{art.descricao}</p>
            </div>

            <div className="art-info">
              <p> Artista(s): {art.nome_artista}</p>
            </div>
            <div className="art-info">
              <p> Estado: {art.uf}</p>
            </div>
            <div className="art-info">
              <p> Cidade: {art.cidade}</p>
            </div>
            <div className="art-info">
              <p> Endereço: {art.endereco}</p>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArtPage;
