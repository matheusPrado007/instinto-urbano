// ArtList.tsx

import React, { useState, useEffect } from 'react';
import { useApi } from '../../services/context/ApiContext';
import { CustomNextArrowArtPage, CustomPrevArrowArtPage } from '../../components/BtnComponent';
import { useParams } from 'react-router-dom';
import '../../styles/Art.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Galeria.css';
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import Loading from '../../components/LoadingComponent';
import Maps from '../../services/Maps';

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

const ArtList: React.FC = () => {
  const { dadosArtes } = useApi();
  const { id } = useParams<{ id?: string }>();
  const [arte, setArte] = useState<GaleriaItem | null>(null);
  const { dadosUsers } = useApi();
  const [isClick, setIsClick] = useState(false);
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
    const fetchData = async () => {
      if (id) {
        const foundArte = dadosArtes.find((a) => a._id === id);

        if (foundArte) {
          setArte(foundArte);
        } else {
          console.error('Arte não encontrada');
        }
      }

    };

    fetchData();

  }, [id, dadosArtes]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrowArtPage />,
    nextArrow: <CustomNextArrowArtPage />,
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    !isClick ? setIsClick(true) : setIsClick(false)
  };

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      {dadosArtes.length <= 0 ? (
        <Loading />
      ) : (
        <section className="art-container-page">
            <Slider {...settings} >
              {dadosArtes.map((item: GaleriaItem) => (
                <div>
                <div>
                  <p className='description-p-art'>{item.nome}</p>
                </div>
                <img src={item.foto} alt={`Capa de ${item.nome}`} className="art-photo" />
                <div className="art-descript">
                  <p>{item.descricao}</p>
                </div>
    
                <div className="art-info">
                  <p> Artista(s): {item.nome_artista}</p>
                </div>
                <div className="art-info">
                  <p> Estado: {item.uf}</p>
                </div>
                <div className="art-info">
                  <p> Cidade: {item.cidade}</p>
                </div>
                <div className="art-info">
                  <p> Endereço: {item.endereco}</p>
                </div>
              </div>
              ))}
            </Slider>
        </section>
      )}
      <Maps />
      <Footer />
    </>
  );
};

export default ArtList;
