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
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import HeaderArtist from '../components/HeaderArtist';



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

const ProfileArtistArtEdit: React.FC = () => {
  const { fazerLogin, dadosArtes, enviarDadosParaBackendArt, dadosUsers, deleteArte } = useApi();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('nome'); // Campo padrão para busca
  const [selectedArte, setSelectedArte] = useState<Arte | null>(null);
  const [newArt, setNewArt] = useState<File | null>(null);
  const [larguraTotal, setLarguraTotal] = useState(100);
  const [isLoading, setIsLoading] = useState(true); 

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

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

const updateArte = async () => {
  const { accessToken, refreshToken, notOk } = await fazerLogin({ email, senha });

  try {
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
    setIsEditingToken(!isEditingToken)
    setShowPopup(true);
    return await enviarDadosParaBackendArt(dados);
  } catch (error) {
    console.error('Error during user deletion:', error);
  }
}

  const handleSaveChanges = async () => {
    try {
      const { accessToken, refreshToken, notOk } = await fazerLogin({ email, senha });
  
    if (notOk) {
      confirmAlert({
        title: 'Aviso',
        message: 'Por favor, forneça seu email e senha válidos.',
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>{'Aviso'}</h1>
              <p>{'Por favor, forneça seu email e senha válidos para confirmar a exclusão da Arte.'}</p>
              <button className="custom-ui-btn" onClick={onClose}>OK</button>
            </div>
          );
        },
      });
      return;
    }
  
    if (!newId) {
      confirmAlert({
        title: 'Aviso',
        message: 'Por favor, escolha uma Arte antes de excluir.',
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>{'Aviso'}</h1>
              <p>{'Por favor, escolha uma Arte antes de excluir.'}</p>
              <button className="custom-ui-btn" onClick={onClose}>OK</button>
            </div>
          );
        },
      });
      return;
    }

    confirmAlert({
      title: 'Confirmação',
      message: 'Tem certeza que deseja deletar essa Arte?',
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>{'Confirmação'}</h1>
            <p>{'Tem certeza que deseja deletar essa Arte?'}</p>
            <button className="custom-ui-btn" onClick={() => {
              updateArte()
              onClose();
            }}>Sim</button>
            <button className="custom-ui-btn" onClick={() => { onClose(); }}>Não</button>
          </div>
        );
      },
    });

    } catch (error) {
      console.error('Erro durante o login:', error);
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
  const user = dadosUsers.find((u) => u._id === id) || null;

  const filteredArtesByArtist = dadosArtes.filter((arte) => arte.nome_artista.toLocaleUpperCase().includes(user?.username.toLocaleUpperCase()));
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchFieldChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchField(event.target.value);
  };

  const handleArteClick = (arteId: number) => {
    setNewId(arteId as any)
    const clickedArte = filteredArtesByArtist.find((arte) => arte._id === arteId);
    setSelectedArte(clickedArte || null);
  };

  const filteredArtes = filteredArtesByArtist.filter((arte) =>
    arte[searchField].toLowerCase().includes(searchTerm.toLowerCase())
  );


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
      const numeroDeImgs = window.innerWidth / 160;
      console.log('numeroimgs',numeroDeImgs);

      const numeroTotal = +numeroDeImgs < filteredArtes.length ? numeroDeImgs : filteredArtes.length - 1
      console.log(numeroTotal.toFixed(1));

      const resulNumber = +numeroTotal === 0 ? 1 : +numeroTotal;
      console.log('result', resulNumber);
      
      const finalResult = +resulNumber.toFixed(0) > 6 ? 5 : +resulNumber;

      setLarguraTotal(+finalResult.toFixed(0));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [filteredArtes.length]);


  const showDeleteConfirmation = async () => {
    const { accessToken, refreshToken, notOk } = await fazerLogin({ email, senha });
  
    if (notOk) {
      confirmAlert({
        title: 'Aviso',
        message: 'Por favor, forneça seu email e senha válidos.',
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>{'Aviso'}</h1>
              <p>{'Por favor, forneça seu email e senha válidos para confirmar a exclusão da Arte.'}</p>
              <button className="custom-ui-btn" onClick={onClose}>OK</button>
            </div>
          );
        },
      });
      return;
    }
  
    if (!newId) {
      confirmAlert({
        title: 'Aviso',
        message: 'Por favor, escolha uma Arte antes de excluir.',
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>{'Aviso'}</h1>
              <p>{'Por favor, escolha uma Arte antes de excluir.'}</p>
              <button className="custom-ui-btn" onClick={onClose}>OK</button>
            </div>
          );
        },
      });
      return;
    }
  
    confirmAlert({
      title: 'Confirmação',
      message: 'Tem certeza que deseja deletar essa Arte?',
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>{'Confirmação'}</h1>
            <p>{'Tem certeza que deseja deletar essa Arte?'}</p>
            <button className="custom-ui-btn" onClick={() => {
              try {
                const dados = {
                  token: accessToken,
                  id: newId,
                };
                deleteArte(dados);
                navigate(`/admuser/${id}`);
              } catch (error) {
                console.error('Error during user deletion:', error);
              }
              onClose();
              
            }}>Sim</button>
            <button className="custom-ui-btn" onClick={() => { onClose(); }}>Não</button>
          </div>
        );
      },
    });
  };




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
      <HeaderArtist />
    <div className='art-admin-container'>
       {isLoading && <Loading />}
      {filteredArtesByArtist.length <= 0 && <Loading />}
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



        <div className="art-container-page">
          {selectedArte && (
            <div>
              <div className="user-info-adm">
                {isEditingName ? (
                  <input
                    type="text"
                    name="nome"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="username-input"
                    placeholder='Nome'
                  />
                ) : (
                  
                  <p className='p-instagram'>{originalName}</p>
                )}
                <button onClick={toggleEditModeName} className="email-edit-button">
                  {isEditingName ? 'Salvar' : 'Editar Nome da Arte'}
                </button>
              </div>
              <label className="label-cover">
                <input
                  type="file"
                  name='imagem'
                  accept='image/*'
                  onChange={(e) => setNewArt(e.target.files?.[0] || null)}
                  className='cover-input'
                />
                <img src={selectedArte.foto} alt={`Capa de ${selectedArte.nome}`} className="art-photo" />
              </label>
              {isEditing ? (
                <div>
                  Descrição
                  <textarea
                    rows={1}
                    name="descricao"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="username-input"
                  />
                </div>
              ) : (
                <p className='p-instagram'>{originalDescription}</p>
              )}
              <button onClick={toggleEditMode} className="edit-button">
                {isEditing ? 'Salvar' : 'Editar Descrição'}
              </button>
              <div className="user-info-adm">
                {isEditingArtist ? (
                  <div>

                    <input
                      type='text'
                      name="nome_artista"
                      value={newArtist}
                      onChange={(e) => setNewArtist(e.target.value)}
                      className="username-input"
                    />
                  </div>
                ) : (
                  <p className='p-instagram'> Artista(s): {originalArtist}</p>
                )}
                <button onClick={toggleEditModeArtist} className="email-edit-button">
                  {isEditingArtist ? 'Salvar' : 'Editar Descrição'}
                </button>
              </div>

              <div className="user-info-adm">
                {isEditingState ? (
                  <div>

                    <input
                      type='text'
                      name="uf"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      className="username-input"
                    />
                  </div>
                ) : (
                  <p className='p-instagram'> Estado: {originalState}</p>
                )}
                <button onClick={toggleEditModeState} className="email-edit-button">
                  {isEditingState ? 'Salvar' : 'Editar Descrição'}
                </button>
              </div>


              <div className="user-info-adm">
                {isEditingCity ? (
                  <div>

                    <input
                      type='text'
                      name="cidade"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="username-input"
                    />
                  </div>
                ) : (
                  <p className='p-instagram'> Cidade: {originalCity} </p>
                )}
                <button onClick={toggleEditModeCity} className="email-edit-button">
                  {isEditingCity ? 'Salvar' : 'Editar Descrição'}
                </button>
              </div>


              <div className="user-info-adm">
                {isEditingAdress ? (
                  <div>
                    <input
                      type='text'
                      name="endereco"
                      value={newAdress}
                      onChange={(e) => setNewAdress(e.target.value)}
                      className="username-input"
                    />
                  </div>
                ) : (
                  <p className='p-instagram'> Endereço: {originalAdress}</p>
                )}
                <button onClick={toggleEditModeAdress} className="email-edit-button">
                  {isEditingAdress ? 'Salvar' : 'Editar Descrição'}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='form-update-post'>
          <p className='form-update'>Digite sua Senha para continuar...</p>

          <p className='email-input'>Email:</p>
          <input
            type="email"
            name="email-TOKEN"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="username-input"
            placeholder='email'
          />


          <p >Senha:</p>
          <input
            type="password"
            name="senha-TOKEN"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="username-input"
            placeholder='senha'
          />

          <button onClick={handleSaveChanges} className="edit-button-finish">
            Atualizar os Dados
          </button>

          {showPopup && <Popup message="Dados Atualizados com Sucesso" onClose={closePopup} />}
        </div>
        <button
          onClick={showDeleteConfirmation}
          className="delete-button"
          // disabled={isDeleteButtonDisabled}
        >
          Deletar Arte
        </button>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default ProfileArtistArtEdit;
