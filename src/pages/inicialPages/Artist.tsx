
import React from 'react';
import '../../styles/Users.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ArtistList from '../../components/ArtistList';


const Artist: React.FC = () => {
 

  return (
    <>
      <Header />
      <ArtistList />
      <Footer />
    </>
  );
};

export default Artist;
