// AdmUser.tsx
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import Loading from '../components/Loading';

const Artist: React.FC = () => {
const [laod, setLoad] = useState(false)

 
    return (
      <>
        <Header />
       {!laod && <Loading /> }
        <div className="content">
          <p>Em Construção</p>
        </div>
        <Footer />
      </>
    );
}
  

  
export default Artist;