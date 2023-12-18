import React from 'react';
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


  let numImagensVisiveis = dados.length; 
  
  const funcTrue = () => {
    if(window.innerWidth < 768) {
      numImagensVisiveis = 2
       
      return 100 / numImagensVisiveis;
    } else {
      return 100 / numImagensVisiveis;
    }
  };

  return (
    <Carousel
      className="galeria"
      showArrows={true}
      showThumbs={false} // Desativar thumbs padrão
      infiniteLoop={true}
      showStatus={false}
      centerMode={true}
      emulateTouch={true}
      selectedItem={0}
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
      centerSlidePercentage={funcTrue()}
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
