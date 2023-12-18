import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Galeria.css';

interface GaleriaItem {
  _id: string;
  foto: string;
  nome_artista: string;
  nome: string;
}

interface GaleriaProps {
  dados: GaleriaItem[];
}

const Galeria: React.FC<GaleriaProps> = ({ dados }) => {
  const [larguraTotal, setLarguraTotal] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth / 220;
      const numImagensVisiveis: any = dados.length > 0 ? isMobile.toFixed(1) : dados.length;
      const novaLarguraTotal = 100 / numImagensVisiveis;
      setLarguraTotal(novaLarguraTotal);
    };

    // Adiciona o listener de evento
    window.addEventListener('resize', handleResize);

    // Chama handleResize quando o componente monta
    handleResize();

    // Remove o listener de evento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dados.length]); 


  return (
    <Carousel
      className="galeria"
      showArrows={true}
      showThumbs={false} 
      infiniteLoop={true}
      showStatus={false}
      centerMode={true}
      emulateTouch={true}
      selectedItem={0}
      swipeable={true} 
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <button type="button" onClick={onClickHandler} title="Anterior">
            &lt;
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <button type="button" onClick={onClickHandler} title="Próximo">
            &gt;
          </button>
        )
      }
      renderIndicator={() => null}
      centerSlidePercentage={larguraTotal}
    >
      {dados.map((item: GaleriaItem) => (
        <div key={item._id} className="galeria-item">
          <img
            src={item.foto}
            className="imagem-galeria"
            alt={`Arte de ${item.nome_artista}`}
          />
          <p className="nome-artista">{item.nome_artista}</p>
          <p className="nome-trabalho">{item.nome}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default Galeria;
