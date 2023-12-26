import React, { useState } from 'react';
import '../styles/Login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useApi } from '../services/context/ApiContext';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { fazerLogin, dadosUsers } = useApi();

  const navigate = useNavigate(); 

  const navigateToProfileAdm = () => {
    const userId = dadosUsers.find((user) => user.email === email)._id
    navigate(`/admuser/${userId}`); 
  };

  const handleLogin = async ({ email, senha }: any) => {
    try {
      const { accessToken, refreshToken } = await fazerLogin({ email, senha });
      if (accessToken && refreshToken) {
        navigateToProfileAdm();
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };
  
  return (
    <>
      <Header />
      <div className='login-width'>
        <div className="login-form">
          <label className="login-label">
            Username:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder='Email'
            />
          </label>
          <label className="login-label">
            Senha:
            <input
              type="text"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="login-input"
              placeholder='Senha'
            />
          </label>
          <button onClick={() => handleLogin({email, senha}) } className="login-button"> 
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
