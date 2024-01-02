import React, { useState, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';
import Footer from '../components/Footer';
import HeaderAdmin from '../components/HeaderAdmin';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import '../styles/ProfileAdm.css';
import fotoCapa from '../assets/not-found.png';
import fotoPerfil from '../assets/profile-not-found.jpg';
import Popup from '../components/PopUp';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
}

const ProfileAdmin: React.FC = () => {
    const { fazerLogin, dadosUsers, enviarDadosParaBackend, deleteUsuario } = useApi();
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [newCapa, setNewCapa] = useState<File | null>(null);
    const [newPerfil, setNewPerfil] = useState<File | null>(null);
    const [newDescription, setNewDescription] = useState<string>('');
    const [originalDescription, setOriginalDescription] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState<string>('');
    const [originalUsername, setOriginalUsername] = useState<string>('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newEmail, setNewEmail] = useState<string>('');
    const [originalEmail, setOriginalEmail] = useState<string>('');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [originalPassword, setOriginalPassword] = useState<string>('');
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingText, setIsEditingText] = useState(false);
    const [newTexto, setNewTexto] = useState('');
    const [texto, setTexto] = useState('Co-fundador do Rastro Urbano');
    const [isEditingToken, setIsEditingToken] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleClick = () => {
        if (isEditingText) {
            setTexto(newTexto);
        } else {
            setNewTexto(texto);
        }
        setIsEditingText(!isEditingText);
    };




    const toggleEditModePassword = () => {
        if (isEditingPassword) {
            setOriginalPassword(newPassword);
        } else {
            setNewPassword(originalPassword);
        }
        setIsEditingPassword(!isEditingPassword);
    };

    const toggleEditModeEmail = () => {
        if (isEditingEmail) {
            setOriginalEmail(newEmail);
        } else {
            setNewEmail(originalEmail);
        }
        setIsEditingEmail(!isEditingEmail);
    };

    const toggleEditMode = () => {
        if (isEditing) {
            setOriginalDescription(newDescription);
            setOriginalUsername(newUsername);
        } else {
            setNewDescription(originalDescription);
            setNewUsername(originalUsername);
        }
        setIsEditing(!isEditing);
        setIsEditingUsername(false);
    };

    const toggleEditModeUsername = () => {
        if (isEditingUsername) {
            setOriginalUsername(newUsername);
        } else {
            setNewUsername(originalUsername);
        }
        setIsEditingUsername(!isEditingUsername);
    };

    useEffect(() => {
        if (id) {
            const foundUser = dadosUsers.find((u) => u._id === id);

            if (foundUser) {
                const emailStorage: string = foundUser.email;
                setEmail(emailStorage);
                setUser(foundUser);
                setOriginalDescription(foundUser.descricao_perfil);
                setNewDescription(foundUser.descricao_perfil);
                setOriginalUsername(foundUser.username);
                setNewUsername(foundUser.username);
                setNewEmail(foundUser.email);
                setOriginalEmail(foundUser.email);
                setOriginalPassword(foundUser.senha);
            } else {
                console.error('Usuário não encontrado');
            }
        }
    }, [id, dadosUsers]);

    const closePopup = () => {
        setShowPopup(false);
    };


    const updateDados = async () => {
        const { accessToken, refreshToken } = await fazerLogin({ email, senha });
        const dados = {
            newUsername,
            newDescription,
            newEmail,
            newCapa,
            newPerfil,
            newPassword,
            id,
            accessToken,
        };

        await enviarDadosParaBackend(dados);
        setShowPopup(true);
        setIsEditingToken(!isEditingToken);
    }

    const handleSaveChanges = async () => {
        try {
            const { accessToken, refreshToken, notOk } = await fazerLogin({ email, senha });
            if (notOk) {
                confirmAlert({
                    title: 'Aviso',
                    message: 'Por favor, forneça seu email e senha válidos para confirmar a exclusão da Arte.',
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { },
                        },
                    ],
                    customUI: ({ onClose }) => (
                        <div className="custom-ui">
                            <h1>{'Aviso'}</h1>
                            <p>{'Por favor, forneça seu email e senha válidos para confirmar a Atualização do perfil.'}</p>
                            <button onClick={onClose}>OK</button>
                        </div>
                    ),
                });
                return;
            }
            confirmAlert({
                title: 'Confirmação',
                message: 'Tem certeza que deseja atualizar esses dados?',
                customUI: ({ onClose }) => (
                    <div className="custom-ui">
                        <h1>{'Confirmação'}</h1>
                        <p>{'Tem certeza que deseja atualizar esses dados?'}</p>
                        <button onClick={() => { updateDados(); onClose(); }}>Sim</button>
                        <button onClick={() => { onClose(); }}>Não</button>
                    </div>
                ),
            });
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
    };

    const showDeleteConfirmation = async () => {
        const { accessToken, refreshToken, notOk } = await fazerLogin({ email, senha });
        if (notOk) {
            confirmAlert({
                title: 'Aviso',
                message: 'Por favor, forneça seu email e senha válidos.',
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { },
                    },
                ],
                customUI: ({ onClose }) => {
                    return (
                        <div className="custom-ui">
                            <h1>{'Aviso'}</h1>
                            <p>{'Por favor, forneça seu email e senha válidos para confirmar a exclusão d perfil.'}</p>
                            <button onClick={onClose}>OK</button>
                        </div>
                    );
                },
            });
            return;
        }
        if (!id) {
            confirmAlert({
                title: 'Aviso',
                message: 'Por favor, escolha um Usuário antes de excluir.',
                customUI: ({ onClose }) => {
                    return (
                        <div className="custom-ui">
                            <h1>{'Aviso'}</h1>
                            <p>{'Por favor, escolha um Usuário antes de excluir.'}</p>
                            <button onClick={onClose}>OK</button>
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
                        <button onClick={() => { onClose(); }}>Não</button>
                        <button onClick={() => {
                            onClose();
                            try {
                                const dados = {
                                    token: accessToken,
                                    id: id,
                                };
                                deleteUsuario(dados);
                                navigate(`/admuser/${id}`);
                            } catch (error) {
                                console.error('Error during user deletion:', error);
                            }
                        }}>Sim</button>
                    </div>
                );
            },
        });
    };

    const isAdmin = async () => {
        try {
            const { accessToken, refreshToken } = await fazerLogin({ email, senha });

            return accessToken && refreshToken;
        } catch (error) {
            console.error('Erro durante o login:', error);
            return false;
        }
    };

    if (!(isAdmin)) {
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
            <HeaderAdmin />
            <div className="profile-container-adm">
                <a href={`/admuser/${id}/admuser/${id}/perfiladm`} className='profile-edit-finish'>Quer ver como ficou?</a>
                {user ? (
                    <div className='form-adm-profile'>
                        <label className="label-cover">
                            <input
                                type="file"
                                name='foto_capa'
                                accept='image/*'
                                onChange={(e) => setNewCapa(e.target.files?.[0] || null)}
                                className='cover-input'
                            />
                            <img src={!user.foto_capa ? fotoCapa : user.foto_capa} alt={`Capa de ${user.username}`} className="cover-photo-adm" />
                        </label>

                        <label className='label-profile'>
                            <input
                                type="file"
                                name='foto_perfil'
                                accept='image/*'
                                onChange={(e) => setNewPerfil(e.target.files?.[0] || null)}
                                className='profile-input'
                            />
                            <img src={!user.foto_perfil ? fotoPerfil : user.foto_perfil} alt={`Foto de perfil de ${user.username}`} className="profile-photo-adm" />
                        </label>
                        <div className="user-info-adm">
                            {
                                isEditingText ? (
                                    <input
                                        type="text"
                                        value={texto}
                                        onChange={(e) =>
                                            setNewTexto(e.target.value)}
                                        className="username-input"
                                    />
                                ) : (
                                    <p className='responsibility-p-adm'>{texto}</p>
                                )
                            }

                            <button onClick={handleClick} className="email-edit-button ">
                                {isEditingText ? 'Salvar' : 'Editar Texto'}
                            </button>
                        </div>
                        <div className="user-info-adm">
                            {isEditingEmail ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="username-input"
                                    placeholder='email'
                                />
                            ) : (

                                <p className='email-input'>Email: </p>

                            )}

                            <button onClick={toggleEditModeEmail} className="email-edit-button ">
                                {isEditingEmail ? 'Salvar' : 'Editar Email'}
                            </button>
                        </div>

                        <div className="user-info-adm">
                            {isEditingPassword ? (
                                <input
                                    type="text"
                                    name="senha"
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="username-input"
                                    placeholder='senha'
                                />
                            ) : (
                                <p>Nova Senha:</p>
                            )}

                            <button onClick={toggleEditModePassword} className="email-edit-button ">
                                {isEditingPassword ? 'Salvar' : 'Editar Senha'}
                            </button>
                        </div>

                        <div className="user-info-adm">
                            {isEditingUsername ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    className="username-input"
                                    placeholder='username'
                                />
                            ) : (
                                <p>username:</p>
                            )}
                            <button onClick={toggleEditModeUsername} className="email-edit-button ">
                                {isEditingUsername ? 'Salvar' : 'Editar username'}
                            </button>
                        </div>
                        {isEditing ? (
                            <div>
                                Descrição
                                <textarea
                                    rows={15}
                                    name="descricao"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    className="description-input"
                                />
                            </div>
                        ) : (
                            <div>
                                <p>Descrição:</p>
                                <div className="description-p-adm">
                                    <p>{originalDescription}</p>
                                </div>
                            </div>
                        )}

                        <button onClick={toggleEditMode} className="edit-button">
                            {isEditing ? 'Salvar' : 'Editar Descrição'}
                        </button>
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

                            <button onClick={handleSaveChanges} className="edit-button-finish">
                                Atualizar os Dados
                            </button>

                            {showPopup && <Popup message="Dados Atualizados com Sucesso" onClose={closePopup} />}
                        </div>
                        <button
                            onClick={showDeleteConfirmation}
                            className="delete-button"
                        >
                            Deletar Usuário
                        </button>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProfileAdmin;








