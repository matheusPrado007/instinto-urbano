
# Documentação do Frontend - Instinto Urbano

## Descrição do Projeto
O projeto "Instinto Urbano" é uma aplicação frontend desenvolvida em React e TypeScript. Ele se conecta à API backend para gerenciar dados de usuários e livros, proporcionando uma interface interativa e responsiva.

**Link no GitHub:** [Instinto Urbano](https://github.com/matheusPrado007/instinto-urbano)

## Na sua máquina você deve ter:
- O Node.js deve ter versão igual ou superior à 16.14.0:
  - Para instalar o nvm, acesse [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
  - Rode os comandos abaixo para instalar a versão correta de Node.js e usá-la:
    ```bash
    nvm install 16.14 --lts
    nvm use 16.14
    nvm alias default 16.14
    ```

## Instruções do Projeto
1. Clone o repositório:
   ```bash
   git clone git@github.com:matheusPrado007/instinto-urbano.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd instinto-urbano
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode a aplicação em modo de desenvolvimento:
   ```bash
   npm start
   ```

## Tecnologias Utilizadas e Seus Requisitos
- **Node.js:**
  - Requisitos: sistema operacional compatível (Windows, macOS, Linux).
  - Instalação: siga as instruções no site oficial do [Node.js](https://nodejs.org/).

- **React:**
  - Requisitos: Node.js instalado.
  - Instalação:
    ```bash
    npm install react
    ```

- **TypeScript:**
  - Requisitos: Node.js instalado.
  - Instalação:
    ```bash
    npm install typescript
    ```

- **Bootstrap:**
  - Requisitos: Node.js instalado.
  - Instalação:
    ```bash
    npm install bootstrap
    ```

## Estrutura do Projeto
```
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.tsx
│   └── index.tsx
├── package.json
```

## Rotas do Frontend
### AppRouter.tsx
- **Home**
  - **path:** /
  - **Componente:** Home

- **Sobre**
  - **path:** /sobre
  - **Componente:** Sobre

- **Login**
  - **path:** /login
  - **Componente:** Login

- **Perfil do Usuário**
  - **path:** /profile/:id
  - **Componente:** ProfilePage

- **Artistas**
  - **path:** /artistas
  - **Componente:** Artist

- **Artes**
  - **path:** /artes
  - **Componente:** ArtList

- **Página de Arte**
  - **path:** /arte/:arteId
  - **Componente:** ArtPage

- **Administração de Usuário**
  - **path:** /admuser/:id
  - **Componente:** AdmUser

- **Administração de Artistas**
  - **path:** /admuser/:id/artistas
  - **Componente:** ArtistAdmin

- **Administração de Artes**
  - **path:** /admuser/:id/artes
  - **Componente:** ArtAdmin

- **Perfil do Artista**
  - **path:** /profileartist/:id
  - **Componente:** ProfileArtist

- **Administração de Artista**
  - **path:** /admartist/:id
  - **Componente:** AdmArtist

- **Edição de Perfil do Artista**
  - **path:** /admartist/:id/profile
  - **Componente:** ProfileArtistEdit

### Rotas Adicionais
- **Perfil do Usuário com ArtistId**
  - **path:** /profile/in/:id/:artistId

- **Administração de Arte para Usuário**
  - **path:** /admuser/:id/artepost
  - **Componente:** ArtPageEdit

- **Administração de Perfil de Usuário**
  - **path:** /admuser/:id/admuser/:userId/perfiladm
  - **Componente:** ProfilePageEdit

## Services
### 1. Service de API (apiService.ts)
- Realiza requisições para a API utilizando Axios.

**Exemplo de requisição:**
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
```

## Autenticação e Autorização
A aplicação utiliza autenticação via JWT. O token deve ser armazenado localmente (por exemplo, no localStorage) e enviado nas requisições que requerem autenticação.

## Problemas Conhecidos
- CORS - ausência de permissão da API.

## Links de Referência
- **Documentação do React:** [React Docs](https://reactjs.org/docs/getting-started.html)
- **Documentação do TypeScript:** [TypeScript Docs](https://www.typescriptlang.org/docs/)


