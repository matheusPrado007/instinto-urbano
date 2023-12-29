import React, { createContext, useContext, useState, useEffect , ReactNode} from 'react';

interface ApiContextProps {
  dadosArtes: any[];
  dadosUsers: any[];
  erro: any;
  getData: () => void;
  fazerLogin: any;
  enviarDadosParaBackend: any;
  enviarDadosParaBackendArt: any;
}

const ApiContext = createContext<ApiContextProps | null>(null);

interface ApiProviderProps {
    children: ReactNode;
  }

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [dadosArtes, setDadosArtes] = useState<any[]>([]);
  const [dadosUsers, setDadosUsers] = useState<any[]>([]);
  const [erro, setErro] = useState<any | null>(null);


  async function enviarDadosParaBackendArt(dados: any) {    
    const url = `https://api-rastro-urbano.onrender.com/upload/updatearte/${dados.id}`;
  
    const headers = {
      'Authorization': `Bearer ${dados.accessToken}`,
    };
  
    const formData = new FormData();
  
    formData.append('nome_artista', dados.newArtist);
    formData.append('nome', dados.newName);
    formData.append('endereco', dados.newAdress);
    formData.append('descricao', dados.newDescription);
    formData.append('uf', dados.newState);
    formData.append('cidade', dados.newCity);
  
    // Adicione os arquivos
    formData.append('foto', dados.newArt);
  
    try {
      const response = await fetch(url, {
        method: 'PUT', // ou 'POST', dependendo do método esperado pelo backend
        headers,
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.statusText}`);
      }
  
      const resultado = await response.json();
      console.log('Dados atualizados com sucesso:', resultado);
      return `Dados atualizados com sucesso:`
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }
    }

 async function enviarDadosParaBackend(dados: any) {    
  const url = `https://api-rastro-urbano.onrender.com/upload/updateuser/${dados.id}`;

  const headers = {
    'Authorization': `Bearer ${dados.accessToken}`,
  };

  const formData = new FormData();

  formData.append('username', dados.newUsername);
  formData.append('descricao_perfil', dados.newDescription);
  formData.append('email', dados.newEmail);
  formData.append('senha', dados.newPassword);

  // Adicione os arquivos
  formData.append('foto_capa', dados.newCapa);
  formData.append('foto_perfil', dados.newPerfil);

  try {
    const response = await fetch(url, {
      method: 'PUT', // ou 'POST', dependendo do método esperado pelo backend
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro no servidor: ${response.statusText}`);
    }

    const resultado = await response.json();
    console.log('Dados atualizados com sucesso:', resultado);
    return `Dados atualizados com sucesso:`
  } catch (error) {
    console.error('Erro ao enviar dados para o backend:', error);
  }
  }
  

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
    enviarDadosParaBackend,
    enviarDadosParaBackendArt
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
