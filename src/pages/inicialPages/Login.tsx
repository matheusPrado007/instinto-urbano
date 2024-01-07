import React, { useState, useEffect } from 'react';
import '../../styles/Login.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useApi } from '../../services/context/ApiContext';
import { useNavigate } from 'react-router-dom';
import MapsLogin from '../../services/MapsLogin';
import Loading from '../../components/Loading';
import olhoAberto from '../../assets/olho-aberto.png'
import olhoFechado from '../../assets/olho-fechado.png'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [saveEmail, setSaveEmail] = useState(false);

    const [senhaVisivel, setSenhaVisivel] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
      
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1300);
  
      return () => {
        clearTimeout(timeout);
      };
    }, []);
  

    const { fazerLogin, dadosUsers } = useApi();
    const navigate = useNavigate();

    const navigateToProfileAdm = (userId: string) => {
        navigate(`/admuser/${userId}`);
    };

    const navigateToProfileArtist = (userId: string) => {
        navigate(`/admartist/${userId}`);
    };

    useEffect(() => {
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
                if (saveEmail) {
                    localStorage.setItem('savedEmail', email);
                } else {
                    localStorage.removeItem('savedEmail');
                }

                const userId = dadosUsers.find((user) => user.email === email)._id;
                const user = dadosUsers.find((user) => user.email === email);
                if(user.administrador === true) {
                    navigateToProfileAdm(userId);
                } else {
                    navigateToProfileArtist(userId)
                }
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    const handleToggleSenha = () => {
        setMostrarSenha((prevMostrarSenha) => !prevMostrarSenha);
    };

    return (
        <>
            <Header />
            {isLoading && <Loading />}
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
                        {/* <div className='login-label-senha'> */}
                        <input
                             type={mostrarSenha ? 'text' : 'password'}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="login-input"
                            placeholder="Senha"
                        />
                    <div onClick={handleToggleSenha} >
                        {!mostrarSenha ?
                        <img src={olhoFechado} alt="olho-aberto" className='btn-senha' />
                         : <img src={olhoAberto} alt="olho-fechado" className='btn-senha' /> 
                         }
                    </div>
                    {/* </div> */}
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
