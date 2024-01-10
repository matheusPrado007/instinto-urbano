import React, { useState, useEffect } from 'react';
import { useApi } from '../../services/context/ApiContext';
import Footer from '../../components/FooterComponent';
import HeaderAdmin from '../../components/HeaderAdmin';
import Header from '../../components/HeaderComponent';
import '../../styles/ProfileAdm.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ProfileEditComponent from '../../components/ProfileEditComponent';

interface User {
    _id: number;
    username: string;
    foto_capa: string;
    foto_perfil: string;
    descricao_perfil: string;
}

const ProfileAdmin: React.FC = () => {
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
            <HeaderAdmin />
            <ProfileEditComponent />
            <Footer />
        </>
    );
};

export default ProfileAdmin;








