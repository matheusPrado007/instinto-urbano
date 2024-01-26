import React, { useState, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';
import Loading from './LoadingComponent';
import { useParams } from 'react-router-dom';
import '../styles/ProfileAdm.css';
import fotoCapa from '../assets/not-found.png';
import fotoPerfil from '../assets/profile-not-found.jpg';
import Popup from './PopUpComponent';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
    administrador: string
}

const ProfileEditComponent: React.FC = () => {
    const { fazerLogin, dadosUsers, enviarDadosParaBackend, deleteUsuario } = useApi();
    const { id, userId } = useParams<{ id?: string, userId?: string }>();
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
    const [texto, setTexto] = useState('');

    const [isEditingToken, setIsEditingToken] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [newLinkedin, setNewLinkedin] = useState<string>('');
    const [originalLinkedin, setOriginalLinkedin] = useState<string>('');
    const [isEditingLinkedin, setIsEditingLinkedin] = useState(false);

    const [newInstagram, setNewInstagram] = useState<string>('');
    const [originalInstagram, setOriginalInstagram] = useState<string>('');
    const [isEditingInstagram, setIsEditingInstagram] = useState(false);

    const [newAdm, setNewAdm] = useState<boolean>(false);
    const [originalAdm, setOriginalAdm] = useState<boolean>(true);
    const [isEditingAdm, setIsEditingAdm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1300);

        return () => {
            clearTimeout(timeout);
        };
    }, []);



    const toggleEditModeAdm = () => {
        if (isEditingAdm) {
            setOriginalAdm(newAdm);
        } else {
            setNewAdm(originalAdm);
        }
        setIsEditingAdm(!isEditingAdm);
    };


    const toggleEditModeInstagram = () => {
        if (isEditingInstagram) {
            setOriginalInstagram(newInstagram);
        } else {
            setNewInstagram(originalInstagram);
        }
        setIsEditingInstagram(!isEditingInstagram);
    };

    const toggleEditModeLinkedin = () => {
        if (isEditingLinkedin) {
            setOriginalLinkedin(newLinkedin);
        } else {
            setNewLinkedin(originalLinkedin);
        }
        setIsEditingLinkedin(!isEditingLinkedin);
    };

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
        const urlAtual = window.location.href;
        let foundUser;
        if (id) {
            if (urlAtual.includes(`perfilartistaedit`)) {
                foundUser = dadosUsers.find((u) => u._id === userId);
            } else {
                foundUser = dadosUsers.find((u) => u._id === id);
            }

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
                setOriginalLinkedin(foundUser.linkedin);
                setNewLinkedin(foundUser.linkedin);
                setOriginalInstagram(foundUser.instagram);
                setNewInstagram(foundUser.instagram);
                setOriginalAdm(foundUser.administrador);
                setNewAdm(foundUser.administrador);
                setTexto(foundUser.descricao_curta);
                setNewTexto(foundUser.descricao_curta);

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
            newAdm,
            newInstagram,
            newLinkedin,
            texto,
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
                    customUI: ({ onClose }) => (
                        <div className="custom-ui">
                            <h1>{'Aviso'}</h1>
                            <p>{'Por favor, forneça seu email e senha válidos para confirmar a Atualização do perfil.'}</p>
                            <button className="custom-ui-btn" onClick={onClose}>OK</button>
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
                        <button className="custom-ui-btn" onClick={() => { updateDados(); onClose(); }}>Sim</button>
                        <button className="custom-ui-btn" onClick={() => { onClose(); }}>Não</button>
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
                            <button className="custom-ui-btn" onClick={onClose}>OK</button>
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
                        <button className="custom-ui-btn" onClick={() => { onClose(); }}>Não</button>
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
                <div className="content">
                    <p>Você não tem permissão para acessar esta página.</p>
                </div>
            </>
        );
    }

    return (
        <>
            {isLoading && <Loading />}
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
                                        name="descricao_curta"
                                        value={newTexto}
                                        onChange={(e) =>
                                        setNewTexto(e.target.value)}
                                        className="username-input"
                                        maxLength={100}
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
                            {user.administrador && (
                                <div>
                                    {isEditingAdm ? (
                                        <label className="login-label-checkbox-profile-adm">
                                            <span className="login-label-checkbox-input-profile-adm">Admin: </span>
                                            <div className="checkbox-container-profile-adm">
                                                <input
                                                    type="checkbox"
                                                    checked={newAdm}
                                                    onChange={(e) => setNewAdm(e.target.checked)}
                                                    className="checkbox-input-profile-adm login-label-checkbox-input-profile-adm"
                                                />
                                                <div className="checkbox-custom-profile-adm">✔</div>
                                            </div>
                                        </label>
                                    ) : (
                                        <div>
                                            <p>Admin: {originalAdm ? 'Sim' : 'Não'}</p>
                                        </div>
                                    )}

                                    <button onClick={toggleEditModeAdm} className="email-edit-button">
                                        {isEditingAdm ? 'Salvar' : 'Editar Admin'}
                                    </button>
                                </div>
                            )}

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

                                <div className='p-instagram'>
                                    <p className='email-input'>Email: </p>

                                    <p >{originalEmail}</p>
                                </div>

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
                                <div className='p-instagram'>
                                    <p>username:</p>
                                    <p >{originalUsername}</p>
                                </div>

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
                        <div className="user-info-adm">
                            {isEditingLinkedin ? (
                                <div>
                                    Linkedin:
                                    <input
                                        type='text'
                                        name="linkedin"
                                        value={newLinkedin}
                                        onChange={(e) => setNewLinkedin(e.target.value)}
                                        className="username-input"
                                    />
                                </div>
                            ) : (
                                <div className='p-instagram'>
                                    <p>Linkedin:</p>
                                    <p>{originalLinkedin}</p>
                                </div>
                            )}

                            <button onClick={toggleEditModeLinkedin} className="email-edit-button ">
                                {isEditingLinkedin ? 'Salvar' : 'Editar Linkedin'}
                            </button>
                        </div>
                        <div className="user-info-adm">
                            {isEditingInstagram ? (
                                <div>
                                    Instagram:
                                    <input
                                        type='text'
                                        name="instagram"
                                        value={newInstagram}
                                        onChange={(e) => setNewInstagram(e.target.value)}
                                        className="username-input"
                                    />
                                </div>
                            ) : (
                                <div className='p-instagram'>
                                    <p >Instagram:</p>
                                    <p >{originalInstagram}</p>
                                </div>
                            )}

                            <button onClick={toggleEditModeInstagram} className="email-edit-button ">
                                {isEditingInstagram ? 'Salvar' : 'Editar Linkedin'}
                            </button>
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
        </>
    );
};

export default ProfileEditComponent;








