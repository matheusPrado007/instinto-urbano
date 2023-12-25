// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/About';
import ProfilePage from './pages/Profile';
import ArtList from './pages/Art';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/artes" element={<ArtList />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
