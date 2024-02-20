import React, { useState, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';

import Loading from './LoadingComponent';
import '../styles/ArtAdmin.css'
import Popup from './PopUpComponent'
import { useParams } from 'react-router-dom';
import arteFoto from '../assets/profile-not-found.jpg'
import { useNavigate } from 'react-router-dom';
import { decrypt } from '../utils/Crypto';



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

const ArtPostComponent: React.FC = () => {
  const { fazerLogin, dadosArtes, enviarDadosParaBackendArtPost, dadosUsers } = useApi();
  const { id } = useParams<{ id?: string }>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('nome');

  const [previewArt, setPreviewArt] = useState<any>();

  const [newArt, setNewArt] = useState<File | null>(null);

  const [showPopup, setShowPopup] = useState<any>();

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

  const [newUsername, setNewUsername] = useState<string>('');
  const [originalUsername, setOriginalUsername] = useState<string>('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  
  const [newId, setNewId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const idDecrypt = decrypt(id as string)
  const foundUser = dadosUsers.find((u) => u._id === idDecrypt);
  const usernameNew = foundUser && foundUser.username;

  useEffect(() => {

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const navigate = useNavigate();

  // const navigateToArt = () => {
  //   if (newId) {
  //     navigate(`admartist/${decrypt(id as string)}/arte/${newId}/admartist`);
  //   }
  // }


  const [selectedArte, setSelectedArte] = useState<any>({
    foto: arteFoto,
    nome_artista: newArtist,
    nome: newName,
    endereco: newAdress,
    descricao: newDescription,
    estado: newState,
    cidade: newCity,
    username: newUsername
  });
  const closePopup = () => {
    setShowPopup(undefined);
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
        accessToken,
        username: usernameNew
      };

      const idArt = await enviarDadosParaBackendArtPost(dados);
      setNewId(idArt)
      if (idArt) {
        return setShowPopup(true);
      } else {
        return setShowPopup(false);
      }
    } catch (error) {
      setShowPopup(false);
      console.error('Erro durante o login:', error);
    }
  };

  const toggleEditModeUsername = () => {
    if (isEditingUsername) {
      setOriginalUsername(newUsername)
    } else {
      setNewUsername(originalUsername)
    }
    setIsEditingUsername(!isEditingUsername)
  };




  const toggleEditModeToken = async () => {
    try {
      setIsEditingToken(!isEditingToken)
      await handleSaveChanges()
      if (newId) {
        return setShowPopup(true);
      } else {
        return setShowPopup(false);
      }
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

  // useEffect(() => {
    // navigateToArt()
  // }, [newId]);

  const username = async () => {
    const foundUser = await dadosUsers.find((u) => u._id === idDecrypt);
    console.log('007', foundUser.username);
    if (idDecrypt) {
      if (foundUser) {
        setOriginalUsername(foundUser.username);
        return foundUser.username
      } else {
        console.error('Usuário não encontrado');
      }
    }
  }

  
  useEffect(() => {

    console.log('007', foundUser && foundUser.username);
    if (idDecrypt) {
      if (foundUser) {
        const emailStorage: string = foundUser.email
        setEmail(emailStorage)
        setOriginalUsername(foundUser.username);
        console.log(foundUser.username);
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


  const renderizaImgNoFrontArte = (e : any) => {
    const file = e.target.files?.[0];
    if (file) {
        setNewArt(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewArt(reader.result as any);
        };
        reader.readAsDataURL(file);
    }
}


  if (!isAdmin) {
    return (
      <>
        <div className="content">
          <p>Você não tem permissão para acessar esta página.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='art-admin-container'>
        {isLoading && <Loading />}
        {dadosArtes.length <= 0 && <Loading />}
        <div className="container-home-admin">


          <div className="art-container-page">
            {selectedArte && (
              <div>

                <div className="user-info-adm">
                  {isEditingUsername ? (
                    <input
                      type="text"
                      name="username"
                      value={foundUser && foundUser.username}
                      onChange={(e) => setNewName(e.target.value)}
                      className="username-input"
                      placeholder='Nome da Arte'
                    />
                  ) : (
                    <p style={{ color: 'green', }} >{foundUser && foundUser.username}</p>
                  )}
                  {/* <button onClick={toggleEditModeUsername} className="email-edit-button">
                  {originalUsername}
                </button> */}
                </div>

                <div className="user-info-adm">
                  {isEditingName ? (
                    <input
                      type="text"
                      name="nome"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="username-input"
                      placeholder='Nome da Arte'
                    />
                  ) : (
                    <p>{originalName}</p>
                  )}
                  <button onClick={toggleEditModeName} className="email-edit-button">
                    {isEditingName ? 'Salvar' : 'Adicione um Nome para Arte'}
                  </button>
                </div>
                <label className="label-cover">
                  <input
                    type="file"
                    name='imagem'
                    accept='image/*'
                    onChange={(e) => renderizaImgNoFrontArte(e)}
                    className='cover-input'
                  />
                  <img src={!previewArt ? selectedArte.foto : previewArt.toString()} alt={`Capa de ${selectedArte.nome}`} className="art-photo" />
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
                  <p>{originalDescription}</p>
                )}
                <button onClick={toggleEditMode} className="edit-button">
                  {isEditing ? 'Salvar' : 'Adicione uma Descrição'}
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
                    <p> Artista(s): {originalArtist}</p>
                  )}
                  <button onClick={toggleEditModeArtist} className="email-edit-button">
                    {isEditingArtist ? 'Salvar' : 'Adicione nome(s) Artistaaaa'}
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
                    <p> Estado: {originalState}</p>
                  )}
                  <button onClick={toggleEditModeState} className="email-edit-button">
                    {isEditingState ? 'Salvar' : 'Adicione um Estado'}
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
                    <p> Cidade: {originalCity} </p>
                  )}
                  <button onClick={toggleEditModeCity} className="email-edit-button">
                    {isEditingCity ? 'Salvar' : 'Adicione uma Cidade'}
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
                    <p> Endereço: {originalAdress}</p>
                  )}
                  <button onClick={toggleEditModeAdress} className="email-edit-button">
                    {isEditingAdress ? 'Salvar' : 'Adicione um Endereço'}
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


            <p>Senha:</p>
            <input
              type="password"
              name="senha-TOKEN"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="username-input"
              placeholder='senha'
            />

            <button onClick={toggleEditModeToken} className="edit-button-finish">
              Adiciona nova Arte
            </button>

            {showPopup !== undefined && (
              <Popup message={showPopup ? "Dados Adicionados com Sucesso" : "Erro ao Adicionar Dados"} onClose={closePopup} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtPostComponent;
