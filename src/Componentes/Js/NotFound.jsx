import React from 'react';
import '../Css/NotFound.css'; // Puedes agregar estilos si lo deseas

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="https://atomichub-ipfs.com/ipfs/QmcvTC6nqQfGP2dPxRN8JqyPFxqYYS1KsBGo4M35JDr5DQ"
        alt="404 Not Found"
        className="not-found-image"
      />
      <p className="not-found-text">Error 404 - Page Not Found</p>
    </div>
  );
};

export default NotFound;
