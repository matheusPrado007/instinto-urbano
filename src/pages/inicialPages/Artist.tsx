
import React from 'react';
import '../../styles/Users.css';
import Header from '../../components/HeaderComponent';
import Footer from '../../components/FooterComponent';
import ArtistList from '../../components/ArtistListComponent';


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
