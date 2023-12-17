import React, { useState, useEffect } from 'react';

const ApiDataLoader = () => {
    const [dados, setDados] = useState([]);
    const [erro, setErro] = useState(null);

    const fazerLogin = async () => {
        try {
            const respostaLogin = await fetch('https://api-rastro-urbano.onrender.com/upload/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'matheuspradodeveloper@gmail.com',
                    senha: '123456',
                }),
            });

            if (!respostaLogin.ok) {
                throw new Error('Erro ao fazer login');
            }

            const { accessToken, refreshToken } = await respostaLogin.json();
            localStorage.setItem('jwtToken', accessToken);
            return { accessToken, refreshToken };
        } catch (error: any) {
            console.error('Erro durante a requisição POST de login:', error);
            setErro(error);
            return { accessToken: null, refreshToken: null };
        }
    };

    const getData = async () => {
        try {
            const { accessToken, refreshToken } = await fazerLogin();

            if (refreshToken === null) {
                // Lida com a situação em que accessToken é nulo (undefined ou erro)
                console.error('Erro: AccessToken é nulo.');
                return;
            }

            console.log('Token enviado:', refreshToken);

            const resposta = await fetch('https://api-rastro-urbano.onrender.com/upload/users', {
                method: 'GET',
                headers: {
                    Authorization: refreshToken
                }
            });

            console.log('Resposta da requisição GET:', resposta);

            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                console.error('Erro ao obter dados. Status:', resposta.status, 'Mensagem:', erroTexto);
                throw new Error('Erro ao obter dados');
            }

            const dadosJson = await resposta.json();
            setDados(dadosJson)
            console.log('Dados obtidos:', dadosJson);

        } catch (error: any) {
            console.error('Erro durante a requisição GET de dados:', error);
            setErro(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
        {dados.length > 0 && (
            <ul>
                {dados.map((item: any) => (
                    <li key={item._id}>
                        <div>
                            <p>Artistas:  {item.username}</p>
                            <img src={item.foto_perfil} width="60%" alt={`Arte de ${item.foto_perfil}`} />
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};

export default ApiDataLoader;
