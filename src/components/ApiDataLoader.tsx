import React, { useState, useEffect } from 'react';
import Galeria from './Galeria';
import MapaArteDeRua from './Maps';
import Footer from './Footer';

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

            if (!refreshToken) {
                console.error('Erro: RefreshToken é nulo.');
                return;
            }

            console.log('Token enviado:', refreshToken);

            const resposta = await fetch('https://api-rastro-urbano.onrender.com/upload/artes', {
                method: 'GET',
                headers: {
                    Authorization: refreshToken,
                },
            });

            console.log('Resposta da requisição GET:', resposta);

            if (!resposta.ok) {
                const erroTexto = await resposta.text();
                console.error('Erro ao obter dados. Status:', resposta.status, 'Mensagem:', erroTexto);
                throw new Error('Erro ao obter dados');
            }

            const dadosLocalStorage: any = localStorage.getItem('dados');
            
            const dadosJson = await resposta.json();
            if (!dadosLocalStorage) {
                localStorage.setItem('dados', JSON.stringify(dadosJson));               
            }

            const dadosConvertidos = JSON.parse(dadosLocalStorage);
            setDados(dadosJson);
            console.log('Dados obtidos do localStorage:', dadosConvertidos);
        } catch (error: any) {
            console.error('Erro durante a requisição GET de dados:', error);
            setErro(error.message || 'Erro durante a requisição GET de dados');
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
        <Galeria dados={dados} />
        <MapaArteDeRua dados={dados} />
        </>
    );
};

export default ApiDataLoader;
