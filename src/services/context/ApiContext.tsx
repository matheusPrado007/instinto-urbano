import React, { createContext, useContext, useState, useEffect , ReactNode} from 'react';

interface ApiContextProps {
  dadosArtes: any[];
  dadosUsers: any[];
  erro: any;
  getData: () => void;
  fazerLogin: any;
}

const ApiContext = createContext<ApiContextProps | null>(null);

interface ApiProviderProps {
    children: ReactNode;
  }

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [dadosArtes, setDadosArtes] = useState<any[]>([]);
  const [dadosUsers, setDadosUsers] = useState<any[]>([]);
  const [erro, setErro] = useState<any | null>(null);

  const fazerLogin = async ({ email, senha }: any) => {
    try {
      const respostaLogin = await fetch('https://api-rastro-urbano.onrender.com/upload/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });
  
      if (!respostaLogin.ok) {
        throw new Error(`Erro ao fazer login. Status: ${respostaLogin.status}`);
      }
  
      const { accessToken, refreshToken } = await respostaLogin.json();
      localStorage.setItem('jwtToken', accessToken);
      return { accessToken, refreshToken };
    } catch (error: any) {
      console.error('Erro durante a requisição POST de login:', error);
      throw error; // Lança o erro novamente para ser capturado no componente Login
    }
  };
  

  const getData = async () => {
    try {
      const fetchOptions = {
        method: 'GET',
      };

      const [respostaArtes, respostaUsers] = await Promise.all([
        fetch('https://api-rastro-urbano.onrender.com/upload/artes', fetchOptions),
        fetch('https://api-rastro-urbano.onrender.com/upload/users', fetchOptions),
      ]);

      console.log('Resposta da requisição GET (Artes):', respostaArtes);
      console.log('Resposta da requisição GET (Usuários):', respostaUsers);

      if (!respostaArtes.ok || !respostaUsers.ok) {
        const erroTextoArtes = await respostaArtes.text();
        const erroTextoUsers = await respostaUsers.text();
        console.error('Erro ao obter dados (Artes). Status:', respostaArtes.status, 'Mensagem:', erroTextoArtes);
        console.error('Erro ao obter dados (Usuários). Status:', respostaUsers.status, 'Mensagem:', erroTextoUsers);

        throw new Error('Erro ao obter dados');
      }

      const dadosJsonArtes = await respostaArtes.json();
      const dadosJsonUsers = await respostaUsers.json();
      localStorage.setItem('dados-artes', JSON.stringify(dadosJsonArtes));
      localStorage.setItem('dados-user', JSON.stringify(dadosJsonUsers));

      setDadosArtes(dadosJsonArtes);
      setDadosUsers(dadosJsonUsers);
      console.log('Dados obtidos e armazenados no localStorage:', dadosJsonArtes, dadosJsonUsers);
    } catch (error: any) {
      console.error('Erro durante a requisição GET de dados:', error);
      setErro(error.message || 'Erro durante a requisição GET de dados');
    }
  };

  useEffect(() => {
    getData();

    const intervalId = setInterval(() => {
      getData();
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);

  const contextValue: ApiContextProps = {
    dadosArtes,
    dadosUsers,
    erro,
    getData,
    fazerLogin,
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider');
  }
  return context;
};
