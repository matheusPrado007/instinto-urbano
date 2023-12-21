import React, { useState, useEffect } from 'react';
import {CustomNextArrow, CustomPrevArrow} from './Btn';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/Galeria.css';


interface GaleriaItem {
  _id: string;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string
}

interface GaleriaProps {
  dados: GaleriaItem[];
}

const Galeria: React.FC<GaleriaProps> = ({ dados }) => {
  const [larguraTotal, setLarguraTotal] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const numeroDeImgs = window.innerWidth / 220;

      const numeroTotal = +numeroDeImgs.toFixed(0) < dados.length ? numeroDeImgs : dados.length -1
      console.log(+numeroTotal);
      
      setLarguraTotal(+numeroTotal);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dados.length]); 

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
    <Slider {...settings} className='galeria'>
      {dados.map((item: GaleriaItem) => (
        <div key={item._id} className="galeria-item">
          <img
            src={item.foto}
            className="imagem-galeria"
            alt={`Arte de ${item.nome_artista}`}
          />
          <p className="nome-artista">{item.nome_artista}</p>
          <p className="nome-trabalho">{item.nome}</p>
          <p className="nome-trabalho">{item.endereco}</p>
        </div>
      ))}
    </Slider>
    </>
  );
};

export default Galeria;
