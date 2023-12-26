import React, { useState, useEffect } from 'react';
import {CustomNextArrow, CustomPrevArrow} from './Btn';
import { useApi } from '../services/context/ApiContext';
import { useNavigate } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/Galeria.css';


interface GaleriaItem {
  _id: any;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string
}

const Galeria: React.FC = () => {
  const { dadosArtes } = useApi();
  const [larguraTotal, setLarguraTotal] = useState(100);

  const navigate = useNavigate(); 

  const navigateToArt = (arteId: number) => {
    navigate(`/arte/${arteId}`); 
  };

  useEffect(() => {
    const handleResize = async () => {
      const numeroDeImgs = await window.innerWidth / 220;

      const numeroTotal = await +numeroDeImgs.toFixed(0) < dadosArtes.length ? numeroDeImgs : dadosArtes.length -1
      console.log(+numeroTotal);
      
      setLarguraTotal(+numeroTotal);
    };

     window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dadosArtes.length]);
   

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
      {dadosArtes.map((item: GaleriaItem) => (
        <div key={item._id} className="galeria-item" onClick={() => navigateToArt(item._id)}>
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
