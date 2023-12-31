import React, { useState, ChangeEvent, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';
import Footer from '../components/Footer';
import HeaderAdmin from '../components/HeaderAdmin';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/ArtAdmin.css'
import Popup from '../components/PopUp'
import { useParams } from 'react-router-dom';
import { CustomNextArrow, CustomPrevArrow } from '../components/Btn';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/Galeria.css';



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

const ArtAdmin: React.FC = () => {
  const { fazerLogin, dadosArtes, enviarDadosParaBackendArt, dadosUsers} = useApi();
  const { id } = useParams<{ id?: string }>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('nome'); // Campo padrão para busca
  const [selectedArte, setSelectedArte] = useState<Arte | null>(null);
  const [newArt, setNewArt] = useState<File | null>(null);
  const [larguraTotal, setLarguraTotal] = useState(100);

  const [showPopup, setShowPopup] = useState(false);

  const [newName, setNewName] = useState<string>('');
  const [originalName, setOriginalName] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState(false);

  const [newDescription, setNewDescription] = useState<string>('');
  const [originalDescription, setOriginalDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  const [newArtist, setNewArtist] = useState<string>('');
  const [originalArtist, setOriginalArtist] = useState<string>('');
  const [isEditingArtist, setIsEditingArtist] = useState(false);

  const [newState, setNewState] = useState<string>('');
  const [originalState, setOriginalState] = useState<string>('');
  const [isEditingState, setIsEditingState] = useState(false);

  const [newCity, setNewCity] = useState<string>('');
  const [originalCity, setOriginalCity] = useState<string>('');
  const [isEditingCity, setIsEditingCity] = useState(false);

  const [newAdress, setNewAdress] = useState<string>('');
  const [originalAdress, setOriginalAdress] = useState<string>('');
  const [isEditingAdress, setIsEditingAdress] = useState(false);

  const [isEditingToken, setIsEditingToken] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [newId, setNewId] = useState();

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSaveChanges = async () => {
    try {
      const { accessToken, refreshToken } = await fazerLogin({ email, senha });

      const dados = {
        newArt,
        newName,
        newDescription,
        newAdress,
        newArtist,
        newCity,
        newState,
        id: newId,
        accessToken,
      };

      await enviarDadosParaBackendArt(dados);
      return await enviarDadosParaBackendArt(dados);
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  const toggleEditModeToken = async () => {
    try {
      setIsEditingToken(!isEditingToken)
      await handleSaveChanges()
      setShowPopup(true);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const toggleEditModeAdress = () => {
    if (isEditingAdress) {
      setOriginalAdress(newAdress)
    } else {
      setNewAdress(originalAdress)
    }
    setIsEditingAdress(!isEditingAdress)
  };


  const toggleEditModeCity = () => {
    if (isEditingCity) {
      setOriginalCity(newCity)

    } else {
      setNewCity(originalCity)
    }
    setIsEditingCity(!isEditingCity)
  };

  const toggleEditModeState = () => {
    if (isEditingState) {
      setOriginalState(newState)

    } else {
      setNewState(originalState)
    }
    setIsEditingState(!isEditingState)
  };

  const toggleEditModeArtist = () => {
    if (isEditingArtist) {
      setOriginalArtist(newArtist)

    } else {
      setNewArtist(originalArtist)
    }
    setIsEditingArtist(!isEditingArtist)
  };

  const toggleEditModeName = () => {
    if (isEditingName) {
      setOriginalName(newName)

    } else {
      setNewName(originalName)
    }
    setIsEditingName(!isEditingName)
  };

  const toggleEditMode = () => {
    if (isEditing) {
      setOriginalDescription(newDescription);

    } else {
      setNewDescription(originalDescription);
    }
    setIsEditing(!isEditing);
  };




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
  };

  const filteredArtes = dadosArtes.filter((arte) => {
    const searchTermWithoutTilde = searchTerm.replace(/~/g, '');
    const fieldValueWithoutTilde = arte[searchField].toUpperCase().replace(/~/g, '');
  
    // Verifica se o termo de busca está presente no campo, considerando o ~
    return fieldValueWithoutTilde.includes(searchTermWithoutTilde.toUpperCase()) || (
      searchTermWithoutTilde.startsWith('~') &&
      fieldValueWithoutTilde.includes(searchTermWithoutTilde.substring(1).toUpperCase())
    );
  });
  

  useEffect(() => {
    if (id) {
      const foundUser = dadosUsers.find((u) => u._id === id);
      console.log(foundUser);
      
      if (foundUser) {
          const emailStorage: string = foundUser.email
          setEmail(emailStorage)
      } else {
          console.error('Usuário não encontrado');
      }
  }
  if (selectedArte) {
    setOriginalName(selectedArte.nome);
    setNewName(selectedArte.nome);

    setOriginalDescription(selectedArte.descricao);
    setNewDescription(selectedArte.descricao);

    setOriginalArtist(selectedArte.nome_artista);
    setNewArtist(selectedArte.nome_artista);

    setOriginalState(selectedArte.uf);
    setNewState(selectedArte.uf);

    setOriginalCity(selectedArte.cidade);
    setNewCity(selectedArte.cidade);

    setOriginalAdress(selectedArte.endereco);
    setNewAdress(selectedArte.endereco);
  } else {
      console.error('Arte não encontrada ');
    }

  }, [newId, id, selectedArte]);


  useEffect(() => {
    const handleResize = async () => {
      const numeroDeImgs = window.innerWidth / 300;
      // console.log(numeroDeImgs);
      
      const numeroTotal = +numeroDeImgs.toFixed(0) < filteredArtes.length ? numeroDeImgs : filteredArtes.length -1
      console.log(numeroTotal.toFixed(1));
      
      const resulNumber = +numeroTotal === 0 ? 1 : +numeroTotal;
      setLarguraTotal(+resulNumber.toFixed(0));
    };

     window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [filteredArtes.length]);


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
      {dadosArtes.length <= 0 && <Loading />}
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

export default ArtAdmin;
