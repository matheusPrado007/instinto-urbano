import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useApi } from '../services/context/ApiContext';
import { useNavigate } from 'react-router-dom';
import MapsLogin from '../services/MapsLogin';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [saveEmail, setSaveEmail] = useState(false);

    const { fazerLogin, dadosUsers } = useApi();
    const navigate = useNavigate();

    const navigateToProfileAdm = (userId: string) => {
        navigate(`/admuser/${userId}`);
    };

    useEffect(() => {
        // Carregar o e-mail salvo do localStorage ao iniciar
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setSaveEmail(true);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const { accessToken, refreshToken } = await fazerLogin({ email, senha });
            if (accessToken && refreshToken) {
                // Salvar o e-mail no localStorage se a opção estiver marcada
                if (saveEmail) {
                    localStorage.setItem('savedEmail', email);
                } else {
                    localStorage.removeItem('savedEmail');
                }

                // Navegar para o perfil do usuário
                const userId = dadosUsers.find((user) => user.email === email)._id;
                navigateToProfileAdm(userId);
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <>
            <Header />
            <div className='map-container'>
                <MapsLogin />
            </div>
            <div className="login-width">
                <div className="login-form">
                    <label className="login-label">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            placeholder="Email"
                        />
                    </label>
                    <label className="login-label">
                        Senha:
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="login-input"
                            placeholder="Senha"
                        />
                    </label>
                    <label className="login-label-checkbox">
                        <span className="login-label-checkbox-input" >Salvar e-mail: </span>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={saveEmail}
                                onChange={() => setSaveEmail(!saveEmail)}
                                className="checkbox-input login-label-checkbox-input"                             
                            />
                            <div className="checkbox-custom">✔</div>
                        </div>
                    </label>

                    <button onClick={handleLogin} className="login-button">
                        Login
                    </button>
                    {error && <p className="login-error-message">{error}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
