import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <section className='footer'>
      <div className="container-footer clearfix">
        <div className="footer-content">
          <p>&copy; Comunidade Brasileira de Arte de rua.</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
