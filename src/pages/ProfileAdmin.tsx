import React, { useState, useEffect } from 'react';
import { useApi } from '../services/context/ApiContext';
import Footer from '../components/Footer';
import HeaderAdmin from '../components/HeaderAdmin';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import '../styles/ProfileAdm.css';

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
}

const ProfileAdmin: React.FC = () => {
    const { fazerLogin, dadosUsers } = useApi();
    const { id } = useParams<{ id?: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [newCapa, setNewCapa] = useState<string>('');
    const [newPerfil, setNewPerfil] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [originalDescription, setOriginalDescription] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);

    const [newUsername, setNewUsername] = useState<string>('');
    const [originalUsername, setOriginalUsername] = useState<string>('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);


    const toggleEditMode = () => {
        if (isEditing) {
            setOriginalDescription(newDescription);
            setOriginalUsername(newUsername);
        } else {
            setNewDescription(originalDescription);
            setNewUsername(originalUsername);
        }
        setIsEditing(!isEditing);
        setIsEditingUsername(false); // Certifique-se de que o modo de edição do nome de usuário está desativado
    };

    const toggleEditModeUsername = () => {
        setIsEditingUsername(!isEditingUsername);
    };

    useEffect(() => {
        if (id) {
            const foundUser = dadosUsers.find((u) => u._id === id);

            if (foundUser) {
                setUser(foundUser);
                setOriginalDescription(foundUser.descricao_perfil);
                setNewDescription(foundUser.descricao_perfil);
                setOriginalUsername(foundUser.username);
                setNewUsername(foundUser.username);
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

    const handleSaveChanges = () => {
        console.log('Alterações salvas:', { newCapa, newPerfil, newDescription });
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
                                value={newCapa}
                                onChange={(e) => setNewCapa(e.target.value)}
                                className='cover-input'
                            />
                            <img src={!user.foto_capa ? '../assets/not-found.png' : user.foto_capa} alt={`Capa de ${user.username}`} className="cover-photo-adm" />
                        </label>

                        <label className='label-profile'>
                            <input
                                type="file"
                                name='foto_perfil'
                                value={newPerfil}
                                onChange={(e) => setNewPerfil(e.target.value)}
                                className='profile-input'
                            />
                            <div className='description-data-adm'>
                                <img src={!user.foto_perfil ? '../assets/profile-not-foud.jpg' : user.foto_perfil} alt={`Foto de perfil de ${user.username}`} className="profile-photo-adm" />
                                <p className='responsibility-p-adm'>Co-fundador do Rastro Urbano</p>
                            </div>
                        </label>
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
                            {isEditingUsername ? 'Salvar' : 'Editar'}
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
                            {isEditing ? 'Salvar' : 'Editar'}
                        </button>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
};

export default ProfileAdmin;
