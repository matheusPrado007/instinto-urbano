import React from 'react';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import Home from '../../../src/pages/inicialPages/Home';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';


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
    dadosUsers: [
      { _id: '1', username: 'Usuario1', foto_perfil: 'url-da-imagem1', administrador: true },
      { _id: '2', username: 'Usuario2', foto_perfil: 'url-da-imagem2', administrador: true },
      { _id: '3', username: 'Usuario3', foto_perfil: 'url-da-imagem3', administrador: false },
    ],
  })),
}));


jest.mock('../../../src/assets/logo01.png', () => 'logo01.png');

describe('Home Page', () => {
  
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    cleanup();
  });
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

////////
  
it('test se artistas e criadores aparecem na pagina', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  jest.mock('../../../src/services/context/ApiContext', () => ({
    useApi: jest.fn(() => ({
      dadosUsers: jest.fn().mockReturnValue([
        { _id: '1', username: 'Usuario1', foto_perfil: 'url-da-imagem1', administrador: true },
        { _id: '2', username: 'Usuario2', foto_perfil: 'url-da-imagem2', administrador: true },
      ]),
    })),
  }));

  await waitFor(() => {
    expect(screen.queryByText(/Carregando.../i)).toBeNull();
  }, { timeout: 10000 });

  const elementoComTexto = screen.getByText(/Equipe de Criação/i);
  expect(elementoComTexto).toBeInTheDocument();

  const elementoComTexto2 = screen.getByText(/Conheça os Artistas/i);
  expect(elementoComTexto2).toBeInTheDocument();

  // Ajuste para o valor correto do atributo alt
  
  const imagensNaTela = screen.getAllByAltText((content: any, element) => {
    return element?.classList.contains('user-avatar') && content.includes('Usuario1');
  });
  
  expect(imagensNaTela.length).toBeGreaterThan(0);
  
  await waitFor(() => {
    imagensNaTela.forEach((imagem) => {
      expect(imagem).toBeInTheDocument();
      expect(imagem).toHaveAttribute('src'); 
      expect(imagem).toHaveClass('user-avatar'); 
    });
  });
  userEvent.click(imagensNaTela[0]);
  expect(window.location.pathname).toBe('/profile/1');
}, 20000);



it('test se artistas aparecem na pagina', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  jest.mock('../../../src/services/context/ApiContext', () => ({
    useApi: jest.fn(() => ({
      dadosUsers: jest.fn().mockReturnValue([
        { _id: '1', username: 'Usuario1', foto_perfil: 'url-da-imagem1', administrador: true },
        { _id: '2', username: 'Usuario2', foto_perfil: 'url-da-imagem2', administrador: true },
        { _id: '3', username: 'Usuario3', foto_perfil: 'url-da-imagem3', administrador: false },
      ]),
    })),
  }));

  await waitFor(() => {
    expect(screen.queryByText(/Carregando.../i)).toBeNull();
  }, { timeout: 10000 });

  const elementoComTexto = screen.getByText(/Equipe de Criação/i);
  expect(elementoComTexto).toBeInTheDocument();

  const elementoComTexto2 = screen.getByText(/Conheça os Artistas/i);
  expect(elementoComTexto2).toBeInTheDocument();

  // Ajuste para o valor correto do atributo alt
  
  const imagensNaTela = screen.getAllByAltText((content: any, element) => {
    return element?.classList.contains('user-avatar-artist') && content.includes(`Usuario3`);
  });
  
  expect(imagensNaTela.length).toBeGreaterThan(0);
  
  await waitFor(() => {
    imagensNaTela.forEach((imagem) => {
      expect(imagem).toBeInTheDocument();
      expect(imagem).toHaveAttribute('src'); 
      expect(imagem).toHaveClass('user-avatar-artist'); 
    });
  });
  userEvent.click(imagensNaTela[0]);
  expect(window.location.pathname).toBe('/profileartist/3');
}, 20000);

});
