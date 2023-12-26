// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/About';
import ProfilePage from './pages/Profile';
import ArtList from './pages/Art';
import ArtPage from './pages/ArtPage';
import Login from './pages/Login';
import AdmUser from './pages/AdmUser';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/artes" element={<ArtList />} />
        <Route path="/arte/:artId" element={<ArtPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admuser/:id" element={<AdmUser />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
