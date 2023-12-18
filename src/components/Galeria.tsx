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
  const numImagensVisiveis = 3; // Defina o número desejado de imagens visíveis por tela
  const larguraTotal = 100 / numImagensVisiveis; // Calcula a largura total da galeria-item

  return (
    <Carousel
    className='galeria'
      showArrows={true}
      showThumbs={false}
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
      centerSlidePercentage={larguraTotal} // Configura a largura total da galeria-item
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
