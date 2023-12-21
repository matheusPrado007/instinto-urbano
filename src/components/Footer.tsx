import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container-footer clearfix">
        <div className="footer-content">
          <p>&copy; 2023 Matheus Prado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
