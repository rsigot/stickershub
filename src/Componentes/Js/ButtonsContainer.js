import React from 'react';
import '../Css/PlanetApp.css'; // Asegúrate de tener un archivo CSS para los estilos

function ButtonsContainer({ userID }) {
  const isDisabled = !userID;

  return (
    <div className="buttons-container">
      <div className={`button-buttons disabled ${isDisabled ? 'disabled' : ''}`} style={{ backgroundImage: 'url(https://i.imgur.com/OUk21Oi.png)' }}>
        <div className="coming-soon-buttons">Coming Soon</div>
      </div>
      <div className={`button-buttons disabled ${isDisabled ? 'disabled' : ''}`} style={{ backgroundImage: 'url(https://i.imgur.com/rIg6Msr.png)' }}>
        <div className="coming-soon-buttons">Coming Soon</div>
      </div>
      <div className={`button-buttons disabled ${isDisabled ? 'disabled' : ''}`} style={{ backgroundImage: 'url(https://i.imgur.com/uLrnI4Q.png)' }}>
        <div className="coming-soon-buttons">Coming Soon</div>
      </div>
    </div>
  );
}

export default ButtonsContainer;
