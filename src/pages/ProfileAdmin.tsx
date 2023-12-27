// AdmUser.tsx
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


    useEffect(() => {
        if (id) {
            const foundUser = dadosUsers.find((u) => u._id === id);

            if (foundUser) {
                setUser(foundUser);
            } else {
                console.error('Usuário não encontrado');
            }
        }
    }, [id, dadosUsers]);

    const isAdmin = async ({ email, senha }: any) => {

        try {
            const { accessToken, refreshToken } = await fazerLogin({ email, senha });
            if (accessToken && refreshToken) {
                return true
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
        }
    };

    const handleSaveChanges = () => {
        console.log('Alterações salvas:', { newCapa, newPerfil });
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
                            <p>{user.username}</p>
                        </div>
                        <div className='description-p-adm'>
                            <p>{user.descricao_perfil}</p>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
};

export default ProfileAdmin;
