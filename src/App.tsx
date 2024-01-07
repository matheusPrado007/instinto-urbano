// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/InicialPages/Home';
import Sobre from './pages/InicialPages/About';
import ProfilePage from './pages/Profile';
import ArtList from './pages/InicialPages/Art';
import ArtPage from './pages/ArtPage';
import Login from './pages/InicialPages/Login';
import AdmUser from './pages/AdmUser';
import ProfileAdmin from './pages/ProfileAdmin';
import ArtistAdmin from './pages/ArtistAdmin';
import ArtAdmin from './pages/ArtAdmin';
import ProfileAdminPost from './pages/ProfilePost';
import ProfilePageEdit from './pages/ProfileEdit';
import Artist from './pages/InicialPages/Artist';
import ArtPageEdit from './pages/ArtPost';
import ProfileArtist from './pages/ProfileArtist';
import AdmArtist from './pages/AdmArtist';
import ProfileArtistEdit from './pages/ProfileArtistEdit';
import ProfileArtistPost from './pages/ProfileArtistPost';
import ProfileArtistArtEdit from './pages/ProfileArtistArtEdit';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/artes" element={<ArtList />} />
        <Route path="/artistas" element={<Artist/>} />
        <Route path="/arte/:id" element={<ArtPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admuser/:id" element={<AdmUser />} />
        <Route path="/admuser/:id/perfil/" element={<ProfileAdmin />} />
        <Route path="/admuser/:id/artistas" element={<ArtistAdmin/>} />
        <Route path="/admuser/:id/artes" element={<ArtAdmin />} />
        <Route path="/admuser/:id/profilepost" element={<ProfileAdminPost />} />
        <Route path="/admuser/:userId/admuser/:id/perfiladm" element={<ProfilePageEdit/>} />
        <Route path="/admuser/:id/artedit" element={<ArtPageEdit/>} />
        <Route path="/profileartist/:id" element={<ProfileArtist />} />
        <Route path="/admartist/:id" element={<AdmArtist />} />
        <Route path="/admartist/:id/profile" element={<ProfileArtistEdit />} />
        <Route path="/admartist/:id/artepost" element={<ProfileArtistPost />} />
        <Route path="/admartist/:id/arteedit" element={<ProfileArtistArtEdit />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
