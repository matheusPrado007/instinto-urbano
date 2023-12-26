// ArtList.tsx

import React, { useState, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';
import { CustomNextArrow, CustomPrevArrow } from '../components/Btn';
import { useParams } from 'react-router-dom';
import '../styles/Art.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Galeria.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Maps from '../services/Maps';

interface GaleriaItem {
  _id: string;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string;
}

const ArtList: React.FC = () => {
  const { dadosArtes } = useApi();
  const { userId } = useParams<{ userId?: string }>();
  const [arte, setArte] = useState<GaleriaItem | null>(null);
  const { dadosUsers } = useApi();
  const [isClick, setIsClick] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const foundArte = dadosArtes.find((a) => a._id === userId);

        if (foundArte) {
          setArte(foundArte);
        } else {
          console.error('Arte não encontrada');
        }
      }

    };

    fetchData();

  }, [userId, dadosArtes]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    !isClick ? setIsClick(true) : setIsClick(false)
  };

  return (
    <>
      <Header />
      {dadosArtes.length <= 0 ? (
        <Loading />
      ) : (
        <section className="art-container">
          <div className="artes">
            <Slider {...settings} 
            className={isClick ? "galeria-artes-hover": "galeria-artes"}
            >
              {dadosArtes.map((item: GaleriaItem) => (
                <div key={item._id} className="galeria-item-artes"  >
                  <img
                    src={item.foto}
                    className="imagem-galeria-artes"
                    alt={`Arte de ${item.nome_artista}`}
                    onClick={handleImageClick}
                  />
                  <p className="nome-artista-artes">Artista(s): {item.nome_artista}</p>
                  <p className="nome-trabalho-artes">{item.nome}</p>
                  <p className="nome-trabalho-artes">{item.endereco}</p>
                </div>
              ))}
            </Slider>
          </div>
          <Maps />
        </section>
      )}
      <Footer />
    </>
  );
};

export default ArtList;
