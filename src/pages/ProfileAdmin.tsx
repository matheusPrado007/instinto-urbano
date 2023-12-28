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

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
}

const ProfileAdmin: React.FC = () => {
    const { fazerLogin, dadosUsers, enviarDadosParaBackend } = useApi();
    const { id } = useParams<{ id?: string }>();
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
            setTexto(newTexto)
        } else {
            setNewTexto(texto)
        }
        setIsEditingText(!isEditingText)
    };


    const handleSaveChanges = async () => {
        try {
            const { accessToken, refreshToken } = await fazerLogin({ email, senha });
            console.log('token-update', refreshToken);
            console.log(newPerfil);

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
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
    };

    const toggleEditModeToken = () => {
        setIsEditingToken(!isEditingToken)
        handleSaveChanges()
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

            if (foundUser) {
                setUser(foundUser);
                setOriginalDescription(foundUser.descricao_perfil);
                setNewDescription(foundUser.descricao_perfil);
                setOriginalUsername(foundUser.username);
                setNewUsername(foundUser.username);
                setNewEmail(foundUser.email);
                setOriginalEmail(foundUser.email);
                setNewPassword(foundUser.senha);
                setOriginalPassword(foundUser.senha);
            } else {
                console.error('Usuário não encontrado');
            }
        }
    }, [id, dadosUsers]);

    const isAdmin = async ({ email, senha }: any) => {
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

                            <button onClick={handleClick} className="email-edit-button">
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

                                <p className='email-input'>Email:</p>
                            )}

                            <button onClick={toggleEditModeEmail} className="email-edit-button">
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
                                <p>Nova Senha</p>
                            )}

                            <button onClick={toggleEditModePassword} className="username-edit-button">
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

                                <p>{originalUsername}</p>
                            )}
                            <button onClick={toggleEditModeUsername} className="username-edit-button">
                                {isEditingUsername ? 'Salvar' : 'Editar username'}
                            </button>
                        </div>
                        {isEditing ? (
                            <textarea
                                rows={15}
                                name="descricao"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="description-input"
                            />
                        ) : (
                            <div className="description-p-adm">
                                <p>{originalDescription}</p>
                            </div>
                        )}

                        <button onClick={toggleEditMode} className="edit-button">
                            {isEditing ? 'Salvar' : 'Editar Descrição'}
                        </button>
                        <div >
                            <p className='form-update'>Digite seu Email e Senha para continuar</p>

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

                            <button onClick={toggleEditModeToken} className="edit-button">
                                {isEditingToken ? 'Dados atualizados' : 'Atualizar os Dados'}
                            </button>
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

export default ProfileAdmin;
