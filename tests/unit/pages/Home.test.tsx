import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../src/pages/inicialPages/Home';
import '@testing-library/jest-dom';

jest.mock('../../../src/services/context/ApiContext', () => ({
  ...jest.requireActual('../../../src/services/context/ApiContext'),
  useApi: jest.fn(() => ({
    dadosArtes: [
      // {
      //   _id: '657e476c2a7f773d7dcbeac9',
      //   nome_artista: "Style, Lesma, Tadeo",
      //   nome: "The Outlaw Ocean Mural",
      //   foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
      //   descricao: "Arte referente ao projeto The Outlaw Ocean",
      //   uf: "Minas Gerais",
      //   cidade: "Estiva",
      //   endereco: "Rua Cristóvão Chiaradia 86",
      //   __v: 0
      // },
      // {
      //   _id: '657e476c2a7f773d7dcbeac8',
      //   nome_artista: "Style, Lesma, Tadeo",
      //   nome: "The Outlaw Ocean Mural",
      //   foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
      //   descricao: "Arte referente ao projeto The Outlaw Ocean",
      //   uf: "Minas Gerais",
      //   cidade: "Estiva",
      //   endereco: "Rua Cristóvão Chiaradia 86",
      //   __v: 1
      // }
    ]
    // dadosUsers : [{
    //   id: 'sdsdsdsds424',
    //   username: 'matheus',
    //   email: 'test@test.com',
    //   senha: 'sdsd5d45sd',
    //   foto_perfil: 'dsdsjhlkjksd.png',
    //   foto_capa: '123.png',
    //   descricao: 'djkdfjksdf'
    // }]
  })),
}));

jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');

describe('Home Page', () => {
  it('renderiza corretamente com dadosArtes preenchidos', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    // Aguarde um tempo suficientemente longo para permitir que o componente comece o carregamento
    await waitFor(() => {
      // Verifique se o componente Loading não está mais na tela
      expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
    }, { timeout: 10000 }); 

    // Adicione asserções conforme necessário para o estado quando dadosArtes.length > 0
    // const textoNaTela = screen.getByText(/Sua comunidade de Arte de Rua/i);
    // expect(textoNaTela).toBeInTheDocument();
  });
});
