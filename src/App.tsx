// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/inicialPages/Home';
import Sobre from './pages/inicialPages/About';
import ProfilePage from './components/ProfileComponent';
import ArtPage from './components/ArtPageComponent';
import Login from './pages/inicialPages/Login';
import AdmUser from './pages/admPages/AdmUser';
import ProfileAdmin from './pages/admPages/ProfileAdmin';
import ArtistAdmin from './pages/admPages/ArtistAdmin';
import ArtAdmin from './pages/admPages/ArtAdmin';
import ProfileAdminPost from './pages/admPages/ProfileAdminPost';
import ProfilePageEdit from './components/ProfilePageComponent';
import Artist from './pages/inicialPages/Artist';
import ArtPageEdit from './pages/admPages/ArtPagePostAdmin';
import ProfileArtist from './pages/artistPages/ProfileArtist';
import AdmArtist from './pages/artistPages/AdmArtist';
import ProfileArtistEdit from './pages/artistPages/ProfileArtistEdit';
import ProfileArtistPost from './pages/artistPages/ProfileArtistPost';
import ProfileArtistArtEdit from './pages/artistPages/ProfileArtistArtEdit';
import ArtList from './pages/inicialPages/Art';
import ArtistProfileComponent from './components/ArtistProfileComponent';
// import ProfileArtistAdm from './components/ProfileArtistAdm';



const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/in/:id" element={<Home />} />
        <Route path="/sobre/in" element={<Sobre />} />

        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/artist" element={<ProfilePage />} />
        <Route path="/profile/:id/adm" element={<ProfilePage />} />
        <Route path="/profile/:id/adm/:userId/" element={<ProfilePage />} />

        <Route path="/artes" element={<ArtList />} />
        <Route path="/artistas" element={<Artist/>} />
        <Route path="/arte/:arteId" element={<ArtPage />} />
        <Route path="admuser/:id/arte/:arteId/admuser" element={<ArtPage />} />
        <Route path="admartist/:id/arte/:arteId/admartist" element={<ArtPage />} />


        <Route path="/login" element={<Login />} />
        <Route path="/admuser/:id" element={<AdmUser />} />
        <Route path="/admuser/:id/perfil/" element={<ProfileAdmin />} />
        <Route path="/admuser/:id/artistas" element={<ArtistAdmin/>} />
        <Route path="/admuser/:id/artes" element={<ArtAdmin />} />
        <Route path="/admuser/:id/profilepost" element={<ProfileAdminPost />} />
        <Route path="/admuser/:id/admuser/:userId/perfiladm" element={<ProfilePageEdit/>} />
        <Route path="/admuser/:id/artepost" element={<ArtPageEdit/>} />
        <Route path="/profileartist/:id" element={<ProfileArtist />} />

        <Route path="/admartist/:id" element={<AdmArtist />} />
        <Route path="/admartist/:id/profile" element={<ProfileArtistEdit />} />
        <Route path="/admartist/:id/artepost" element={<ProfileArtistPost />} />
        <Route path="/admartist/:id/arteedit" element={<ProfileArtistArtEdit />} />

         <Route path="/admuser/:id/artistas/admuser/:userId/perfilartistaedit" element={<ProfileAdmin />} />
        <Route path="/admuser/:id/artistprofile/:id" element={<ArtistProfileComponent />} /> 

      </Routes>
    </Router>
  );
};

export default AppRouter;
