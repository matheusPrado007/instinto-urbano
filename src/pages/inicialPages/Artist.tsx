
import React from 'react';
import '../../styles/Users.css';
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import ArtistList from '../../components/ArtistListComponent';
import Maps from '../../services/Maps';


const Artist: React.FC = () => {
 

  return (
    <>
      <Header />
      <ArtistList />
      <Maps />
      <Footer />
    </>
  );
};

export default Artist;
