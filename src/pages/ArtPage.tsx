import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../services/context/ApiContext';
import '../styles/ArtPage.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

interface GaleriaItem {
    _id: string;
    foto: string;
    nome_artista: string;
    nome: string;
    endereco: string;
    descricao: string;
    uf: string;
    cidade: string
  }

const ArtPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [art, setArt] = useState<GaleriaItem | null>(null);
  const { dadosArtes } = useApi();

  useEffect(() => {
    if (id) {
      const foundArt = dadosArtes.find((u) => u._id === id);
        console.log('art',foundArt);
        
      if (foundArt) {
        setArt(foundArt);
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }, [id, dadosArtes]);

  return (
    <div>
    <Header />
    <div className="art-container-page">
      {art ? (
        <div>
          <div className='description-p-art'>
            <p>{art.nome}</p>
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
