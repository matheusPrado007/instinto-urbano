import React, { useState, useEffect } from 'react';
import '../../styles/Login.css';
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import { useApi } from '../../services/context/ApiContext';
import { useNavigate } from 'react-router-dom';
import MapsLogin from '../../services/MapsLogin';
import Loading from '../../components/LoadingComponent';
import olhoAberto from '../../assets/olho-aberto.png';
import olhoFechado from '../../assets/olho-fechado.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorInput, setErrorInput] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const [saveEmail, setSaveEmail] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { fazerLogin, dadosUsers } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setSaveEmail(true);
    }
  }, []);

  const navigateToProfile = (userId: string, isAdmin: boolean) => {
    const route = isAdmin ? `/admuser/${userId}` : `/admartist/${userId}`;
    navigate(route);
  };

  const handleLogin = async () => {
    try {
      const { accessToken, refreshToken, notOk, errorResponse } = await fazerLogin({ email, senha });
      console.log(errorResponse);
      console.log(notOk);
      if (notOk) {
          console.log('caiu aqui no 1º');
        if (errorResponse && errorResponse.toLowerCase().includes('senha incorreta')) {
          
          setErrorInput('Senha incorreta. Verifique sua senha.');
        } else {
          setErrorInput('Erro ao fazer login. Verifique suas credenciais.');
        }
        setError(true);
        return;
      }
  

      if (accessToken && refreshToken) {
        if (saveEmail) {
          localStorage.setItem('savedEmail', email);
        } else {
          localStorage.removeItem('savedEmail');
        }
  
        const user = dadosUsers.find((user) => user.email === email);
  
        if (user) {
          navigateToProfile(user._id, user.administrador === true);
        }
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setErrorInput('Erro ao fazer login. Verifique suas credenciais.');
    }
  };
  
  
  

  const handleToggleSenha = () => {
    setMostrarSenha((prevMostrarSenha) => !prevMostrarSenha);
  };

  return (
    <>
      <Header />
      <div className="map-container">
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
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="login-input"
              placeholder="Senha"
            />
            <div onClick={handleToggleSenha}>
              {!mostrarSenha ? (
                <img src={olhoFechado} alt="olho-aberto" className="btn-senha" />
              ) : (
                <img src={olhoAberto} alt="olho-fechado" className="btn-senha" />
              )}
            </div>
          </label>
          <label className="login-label-checkbox">
            <span className="login-label-checkbox-input">Salvar e-mail: </span>
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
          {error && <p className="login-error-message">{errorInput}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
