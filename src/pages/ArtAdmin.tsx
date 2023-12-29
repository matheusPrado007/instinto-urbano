import React, { useState, ChangeEvent, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';
import Footer from '../components/Footer';
import HeaderAdmin from '../components/HeaderAdmin';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/ArtAdmin.css'
import Popup from '../components/PopUp'
import { useParams } from 'react-router-dom';


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

const ArtAdmin: React.FC = () => {
  const { fazerLogin, dadosArtes, enviarDadosParaBackendArt, dadosUsers} = useApi();
  const { id } = useParams<{ id?: string }>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('nome'); // Campo padrão para busca
  const [selectedArte, setSelectedArte] = useState<Arte | null>(null);
  const [newArt, setNewArt] = useState<File | null>(null);

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

  const filteredArtes = dadosArtes.filter((arte) =>
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

  }, [newId, selectedArte]);

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
      <HeaderAdmin />
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


        {searchTerm.length > 0 && filteredArtes.map((arte) => (
          <div
            key={arte._id}
            className="artes-container-adm"
            onClick={() => handleArteClick(arte._id)}
          >
            <div className='cards-arte'>
              {arte.nome}
              <img src={arte.foto} alt={`Capa de ${arte.nome}`} className="art-photo-admin" />
            </div>
          </div>
        ))}

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
                  <div className='description-p-art'>
                    <p>{originalName}</p>
                  </div>
                )}
                <button onClick={toggleEditModeName} className="email-edit-button">
                  {isEditingName ? 'Salvar' : 'Editar Email'}
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
                    className="description-input"
                  />
                </div>
              ) : (
                <div className="art-descript">
                  <p>{originalDescription}</p>
                </div>
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
                      className="description-input"
                    />
                  </div>
                ) : (
                  <div className="art-info">
                    <p> Artista(s): {originalArtist}</p>
                  </div>
                )}
                <button onClick={toggleEditModeArtist} className="edit-button">
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
                      className="description-input"
                    />
                  </div>
                ) : (
                  <div className="art-info">
                    <p> Estado: {originalState}</p>
                  </div>
                )}
                <button onClick={toggleEditModeState} className="edit-button">
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
                      className="description-input"
                    />
                  </div>
                ) : (
                  <div className="art-info">
                    <p> Cidade: {originalCity}</p>
                  </div>
                )}
                <button onClick={toggleEditModeCity} className="edit-button">
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
                      className="description-input"
                    />
                  </div>
                ) : (
                  <div className="art-info">
                    <p> Endereço: {originalAdress}</p>
                  </div>
                )}
                <button onClick={toggleEditModeAdress} className="edit-button">
                  {isEditingAdress ? 'Salvar' : 'Editar Descrição'}
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
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
            Atualizar os Dados
          </button>

          {showPopup && <Popup message="Dados Atualizados com Sucesso" onClose={closePopup} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtAdmin;
