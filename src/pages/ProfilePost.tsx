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


    const [newUser, setNewUser] = useState({
        username: originalUsername,
        email: originalEmail,
        senha: originalPassword,
        foto_capa: fotoCapa,
        foto_perfil: fotoPerfil,
        descricao_perfil: originalDescription,
    });


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
            };

            await enviarDadosParaBackendPost(dados);
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
        console.log(newPerfil);

        if (id) {
            const foundUser = dadosUsers.find((u) => u._id === id);
            const newUserPost = dadosUsers.find((u) => u.username === newUsername)

            if(newUserPost) {
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
            } else {
                console.error('Usuário não encontrado');
            }
        }

    }, [id, dadosUsers]);

    const closePopup = () => {
        setShowPopup(false);
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

                            {showPopup && <Popup message="Dados Atualizados com Sucesso" onClose={closePopup} />}
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
