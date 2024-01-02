// AdmUser.tsx
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import Loading from '../components/Loading';

const Artist: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
 
    return (
      <>
        <Header />
        {isLoading && <Loading />}
        <div className="content">
          <p>Em Construção</p>
        </div>
        <Footer />
      </>
    );
}
  

  
export default Artist;