import React, { useState, useEffect } from 'react';
import '../styles/PopUp.css'; 

const Popup = ({ message, onClose }: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="popup">
      <p className='message-popup'>{message}</p>
    </div>
  );
};

export default Popup;
