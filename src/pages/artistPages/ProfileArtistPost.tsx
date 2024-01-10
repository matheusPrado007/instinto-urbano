import React, { useState} from 'react';
import { useApi } from '../../services/context/ApiContext';
import Footer from '../../components/FooterComponent';
import Header from '../../components/HeaderComponent';
import '../../styles/ArtAdmin.css'

import ArtPostComponent from '../../components/ArtPostComponent';import HeaderArtist from '../../components/HeaderArtist';
;



interface Arte {
  _id: string;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string;
  descricao: string;
  uf: string;
  cidade: string
}
interface GaleriaItem {
  _id: any;
  foto: string;
  nome_artista: string;
  nome: string;
  endereco: string
}

const ProfileArtistPost: React.FC = () => {
  const { fazerLogin} = useApi();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
 


  const isAdmin = async ({ email, senha }: any) => {
    try {
      const { accessToken, refreshToken } = await fazerLogin({ email, senha });
      if (accessToken && refreshToken) {
        return true;
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
    return false;
  };







  if (!isAdmin) {
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
      <HeaderArtist />
         <ArtPostComponent />
      <Footer />
    </>
  );
};

export default ProfileArtistPost;
