import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>&copy; { ( new Date().getFullYear() ) }{' Music Player'}</p>
    </footer>
  );
};

export default Footer;
