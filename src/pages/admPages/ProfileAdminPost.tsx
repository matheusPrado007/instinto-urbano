import React, { useState, useEffect } from 'react';
import { useApi } from '../../services/context/ApiContext';
import Footer from '../../components/FooterComponent';
import HeaderAdmin from '../../components/HeaderAdmin';
import Header from '../../components/HeaderComponent';
import Loading from '../../components/LoadingComponent';
import { useParams } from 'react-router-dom';
import '../../styles/ProfileAdm.css';
import fotoCapa from '../../assets/not-found.png';
import fotoPerfil from '../../assets/profile-not-found.jpg';
import Popup from '../../components/PopUpComponent';

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
}

const ProfileAdminPost: React.FC = () => {
    const { fazerLogin, dadosUsers, enviarDadosParaBackendPost } = useApi();
    const { id } = useParams<{ id?: string }>();

    const [showPopup, setShowPopup] = useState<any>();


    const [user, setUser] = useState<User | null>(null);
    const [newCapa, setNewCapa] = useState<File | null>(null);
    const [newPerfil, setNewPerfil] = useState<File | null>(null);


    const [newResult, setNewResult] = useState<string>('');


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
  



    const [newUser, setNewUser] = useState({
        username: originalUsername,
        email: originalEmail,
        senha: originalPassword,
        foto_capa: fotoCapa,
        foto_perfil: fotoPerfil,
        descricao_perfil: originalDescription,
        linkedin: newLinkedin,
        instagram: newInstagram,
        adminstrador: newAdm
    });

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
            setTexto(newTexto)
        } else {
            setNewTexto(texto)
        }
        setIsEditingText(!isEditingText)
    };


    const handleSaveChanges = async () => {
        try {
            const { accessToken, refreshToken } = await fazerLogin({ email, senha });


            const dados = {
                newUsername,
                newDescription,
                newEmail,
                newCapa,
                newPerfil,
                newPassword,
                newInstagram,
                newLinkedin,
                newAdm,
                accessToken
            };

           const resultPost = await enviarDadosParaBackendPost(dados);
            setNewResult(resultPost)
           if (resultPost ==='Dados atualizados com sucesso:') {
           return setShowPopup(true);
           } else {
            return setShowPopup(false);
           }
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
    };

    const toggleEditModeToken = async () => {
        try {
            setIsEditingToken(!isEditingToken)
            await handleSaveChanges()
            if (newResult ==='Dados atualizados com sucesso:') {
                return setShowPopup(true);
                } else {
                 return setShowPopup(false);
                }
        } catch (error) {
            console.error('Erro:', error);
        }
    };


    const toggleEditModePassword = () => {
        if (isEditingPassword) {
            setOriginalPassword(newPassword)

        } else {
            setNewPassword(originalPassword)
        }
        setIsEditingPassword(!isEditingPassword)
    };


    const toggleEditModeEmail = () => {
        if (isEditingEmail) {
            setOriginalEmail(newEmail)

        } else {
            setNewEmail(originalEmail)
        }
        setIsEditingEmail(!isEditingEmail)
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
            const newUserPost = dadosUsers.find((u) => u.username === newUsername)

            if (newUserPost) {
                setNewUser(newUserPost)
            }

            if (foundUser) {
                const emailStorage: string = foundUser.email
                setEmail(emailStorage)
                setUser(foundUser);
                setOriginalDescription(newDescription);
                setNewDescription(newDescription);
                setOriginalUsername(newUsername);
                setNewUsername(newUsername);
                setNewEmail(newEmail);
                setOriginalEmail(newEmail);
                setNewPassword(newPassword);
                setOriginalPassword(newPassword);
                setOriginalLinkedin(newLinkedin);
                setNewLinkedin(newLinkedin);
                setOriginalInstagram(newInstagram);
                setNewInstagram(newInstagram);
                setOriginalAdm(newAdm);
                setNewAdm(newAdm);
            } else {
                console.error('Usuário não encontrado');
            }
        }

    }, [id, dadosUsers]);

    const closePopup = () => {
        setShowPopup(undefined);
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
            <HeaderAdmin />
            {isLoading && <Loading />}
            <div className="profile-container-adm">
                <a href={`/profile/${id}`} className='profile-edit-finish'>Quer ver como ficou?</a>
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
                            <img src={!newUser.foto_capa ? fotoCapa : newUser.foto_capa} alt={`Capa de ${user.username}`} className="cover-photo-adm" />
                        </label>

                        <label className='label-profile'>
                            <input
                                type="file"
                                name='foto_perfil'
                                accept='image/*'
                                onChange={(e) => setNewPerfil(e.target.files?.[0] || null)}
                                className='profile-input'
                            />
                            <img src={!newUser.foto_perfil ? fotoPerfil : newUser.foto_perfil} alt={`Foto de perfil de ${user.username}`} className="profile-photo-adm" />
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
                                    type="password"
                                    name="senha"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="username-input"
                                    placeholder='senha'
                                />
                            ) : (
                                <p>Senha:</p>
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
                                <div>
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
                                <div>
                                    <p>Instagram:</p>
                                    <p>{originalInstagram}</p>
                                </div>
                            )}

                            <button onClick={toggleEditModeInstagram} className="email-edit-button ">
                                {isEditingInstagram ? 'Salvar' : 'Editar Linkedin'}
                            </button>
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
                                Adicionar novo administrador
                            </button>

                            {showPopup !== undefined && (
                                <Popup message={showPopup ? "Dados Adicionados com Sucesso" : "Erro ao Atualizar Dados"} onClose={closePopup} />
                            )}
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProfileAdminPost;
