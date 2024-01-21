import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import Home from '../../../src/pages/inicialPages/Home';
import Sobre from '../../../src/pages/inicialPages/About';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

jest.mock('../../../src/services/context/ApiContext', () => ({
  ...jest.requireActual('../../../src/services/context/ApiContext'),
  useApi: jest.fn(() => ({
    dadosArtes: [
      {
        _id: '657e476c2a7f773d7dcbeac9',
        nome_artista: "Style, Lesma, Tadeo",
        nome: "The Outlaw Ocean Mural",
        foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
        descricao: "Arte referente ao projeto The Outlaw Ocean",
        uf: "Minas Gerais",
        cidade: "Estiva",
        endereco: "Rua Cristóvão Chiaradia 86",
        __v: 0
      }
    ],
  })),
}));

jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');

describe('Home Page', () => {

  it('não renderiza corretamente', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [],
      })),
    }));

    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
    }, { timeout: 10000 });

  });

  it('renderiza corretamente com dadosArtes preenchidos', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [
          {
            _id: '657e476c2a7f773d7dcbeac9',
            nome_artista: "Style, Lesma, Tadeo",
            nome: "The Outlaw Ocean Mural",
            foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
            descricao: "Arte referente ao projeto The Outlaw Ocean",
            uf: "Minas Gerais",
            cidade: "Estiva",
            endereco: "Rua Cristóvão Chiaradia 86",
            __v: 0
          }
        ],
      })),
    }));

    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Carregando.../i)).toBeNull();
    }, { timeout: 10000 });

    const textoNaTela1 = screen.getByText(/Sua comunidade de Arte de Rua/i);
    expect(textoNaTela1).toBeInTheDocument();

    const textoNaTela2 = screen.getByText(/Veja as artes mais próximas de você./i);
    expect(textoNaTela2).toBeInTheDocument();

    const imagensNaTela = screen.getAllByRole('img');

  });

  it('renderiza Galeria', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [
          {
            _id: '657e476c2a7f773d7dcbeac9',
            nome_artista: "Style, Lesma, Tadeo",
            nome: "The Outlaw Ocean Mural",
            foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
            descricao: "Arte referente ao projeto The Outlaw Ocean",
            uf: "Minas Gerais",
            cidade: "Estiva",
            endereco: "Rua Cristóvão Chiaradia 86",
            __v: 0
          }
        ],
      })),
    }));

    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Carregando.../i)).toBeNull();
    }, { timeout: 10000 });

    const textoNaTela1 = screen.getByText(/Sua comunidade de Arte de Rua/i);
    expect(textoNaTela1).toBeInTheDocument();

    const textoNaTela2 = screen.getByText(/Veja as artes mais próximas de você./i);
    expect(textoNaTela2).toBeInTheDocument();

    await waitFor(() => {
      // Use uma função de correspondência personalizada para verificar a classe da imagem
      const imagensNaTela = screen.getAllByAltText(
        (content: any, element: any) => element?.classList.contains('imagem-galeria')
      );
  
      imagensNaTela.forEach((imagem) => {
        expect(imagem).toBeInTheDocument();
        expect(imagem).toHaveAttribute('src'); 
        expect(imagem).toHaveClass('imagem-galeria'); 
      });
    });
  }, 20000);

  it('renderiza Galeria e imagem é clicavel. Ao clicar deve ir para rota arte/:id', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [
          {
            _id: '657e476c2a7f773d7dcbeac9',
            nome_artista: "Style, Lesma, Tadeo",
            nome: "The Outlaw Ocean Mural",
            foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
            descricao: "Arte referente ao projeto The Outlaw Ocean",
            uf: "Minas Gerais",
            cidade: "Estiva",
            endereco: "Rua Cristóvão Chiaradia 86",
            __v: 0
          }
        ],
      })),
    }));

    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Carregando.../i)).toBeNull();
    }, { timeout: 10000 });

    const textoNaTela1 = screen.getByText(/Sua comunidade de Arte de Rua/i);
    expect(textoNaTela1).toBeInTheDocument();

    const textoNaTela2 = screen.getByText(/Veja as artes mais próximas de você./i);
    expect(textoNaTela2).toBeInTheDocument();

    const imagensNaTela = screen.getAllByAltText(
      (content: any, element: any) => element?.classList.contains('imagem-galeria')
    );
    await waitFor(() => {
  
      imagensNaTela.forEach((imagem) => {
        expect(imagem).toBeInTheDocument();
        expect(imagem).toHaveAttribute('src'); 
        expect(imagem).toHaveClass('imagem-galeria'); 
      });
      
    });
    userEvent.click(imagensNaTela[0]);
    expect(window.location.pathname).toBe('/arte/657e476c2a7f773d7dcbeac9');
  }, 20000);


  it('renderiza Maps', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [
          {
            _id: '657e476c2a7f773d7dcbeac9',
            nome_artista: "Style, Lesma, Tadeo",
            nome: "The Outlaw Ocean Mural",
            foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
            descricao: "Arte referente ao projeto The Outlaw Ocean",
            uf: "Minas Gerais",
            cidade: "Estiva",
            endereco: "Rua Cristóvão Chiaradia 86",
            __v: 0
          }
        ],
      })),
    }));

    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Carregando.../i)).toBeNull();
    }, { timeout: 10000 });

    const textoNaTela1 = screen.getByText(/Veja as artes mais próximas de você./i);
    expect(textoNaTela1).toBeInTheDocument();

    const textoNaTela2 = screen.getByText(/Leaflet/i);
    expect(textoNaTela2).toBeInTheDocument();

    const textoNaTela3 = screen.getByText(/OpenStreetMap/i);
    expect(textoNaTela3).toBeInTheDocument();
    
    
  }, 20000);

  it('renderiza Maps Pop up', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [
          {
            _id: '657e476c2a7f773d7dcbeac9',
            nome_artista: "Style, Lesma, Tadeo",
            nome: "The Outlaw Ocean Mural",
            foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
            descricao: "Arte referente ao projeto The Outlaw Ocean",
            uf: "Minas Gerais",
            cidade: "Estiva",
            endereco: "Rua Cristóvão Chiaradia 86",
            __v: 0
          }
        ],
      })),
    }));

    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Carregando.../i)).toBeNull();
    }, { timeout: 10000 });

    const textoNaTela1 = screen.getByText(/Sua comunidade de Arte de Rua/i);
    expect(textoNaTela1).toBeInTheDocument();

    const textoNaTela2 = screen.getByText(/Veja as artes mais próximas de você./i);
    expect(textoNaTela2).toBeInTheDocument();

    const imagensNaTela = screen.getAllByAltText(
      (content: any, element: any) => element?.classList.contains('leaflet-marker-icon')
    );
    await waitFor(() => {
  
      imagensNaTela.forEach((imagem) => {
        expect(imagem).toBeInTheDocument();
        expect(imagem).toHaveAttribute('src'); 
        expect(imagem).toHaveClass('leaflet-marker-icon'); 
      });
      
    });
    userEvent.click(imagensNaTela[0]);
    expect(window.location.pathname).toBe('/arte/657e476c2a7f773d7dcbeac9');
  }, 20000);


  it('renderiza Sobre', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [
          {
            _id: '657e476c2a7f773d7dcbeac9',
            nome_artista: "Style, Lesma, Tadeo",
            nome: "The Outlaw Ocean Mural",
            foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
            descricao: "Arte referente ao projeto The Outlaw Ocean",
            uf: "Minas Gerais",
            cidade: "Estiva",
            endereco: "Rua Cristóvão Chiaradia 86",
            __v: 0
          }
        ],
      })),
    }));

    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Carregando.../i)).toBeNull();
    }, { timeout: 10000 });

    const textoNaTela1 = screen.getByText(/Descubra 'Rastro Urbano'/i);
    expect(textoNaTela1).toBeInTheDocument();

    const textoNaTela2 = screen.getByText(/Onde a paixão pela arte urbana ganha vida. Em nosso santuário virtual, proporcionamos uma experiência envolvente, revelando emoções e visuais únicos de cada obra nas ruas brasileiras./i);
    expect(textoNaTela2).toBeInTheDocument();

    const textoNaTela3 = screen.getByText(/Sobre nós/i);
    expect(textoNaTela3).toBeInTheDocument();

  }, 20000);

  it('Btn "Sobre nós" funciona', async () => {
    jest.mock('../../../src/services/context/ApiContext', () => ({
      ...jest.requireActual('../../../src/services/context/ApiContext'),
      useApi: jest.fn(() => ({
        dadosArtes: [
          {
            _id: '657e476c2a7f773d7dcbeac9',
            nome_artista: "Style, Lesma, Tadeo",
            nome: "The Outlaw Ocean Mural",
            foto: "https://storage.googleapis.com/rastro-urbano.appspot.com/f272e52c-93c1…",
            descricao: "Arte referente ao projeto The Outlaw Ocean",
            uf: "Minas Gerais",
            cidade: "Estiva",
            endereco: "Rua Cristóvão Chiaradia 86",
            __v: 0
          }
        ],
        dadosUsers: [{
          id: 'sdsdsdsds424',
          username: 'matheus',
          email: 'test@test.com',
          senha: 'sdsd5d45sd',
          foto_perfil: 'dsdsjhlkjksd.png',
          foto_capa: '123.png',
          descricao: 'djkdfjksdf'
          }]
      })),
    }));
  
    jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');
    render(
      <BrowserRouter>
      <Home />
    </BrowserRouter>
    );
  
    await waitFor(() => {
      expect(screen.queryByText(/Carregando.../i)).toBeNull();
    }, { timeout: 10000 });
  
    const btnSobreNos = screen.getByText(/Sobre nós/i);
    expect(btnSobreNos).toBeInTheDocument();
  
    userEvent.click(btnSobreNos);
  
  
    expect(window.location.pathname).toBe('/sobre');
  }, 20000);
  
});
