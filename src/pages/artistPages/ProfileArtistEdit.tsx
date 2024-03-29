import React, { useState, useEffect } from 'react';
import { useApi } from '../../services/context/ApiContext';
import Footer from '../../components/FooterComponent';
import Header from '../../components/HeaderComponent';
import '../../styles/ProfileAdm.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ProfileEditComponent from '../../components/ProfileEditComponent';
import HeaderArtist from '../../components/HeaderArtist';

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
}

const ProfileArtistEdit: React.FC = () => {
    const { fazerLogin } = useApi();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

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
            <HeaderArtist/>
            <ProfileEditComponent />
            <Footer />
        </>
    );
};

export default ProfileArtistEdit;








