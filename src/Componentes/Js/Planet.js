import React, { useState, useEffect, useContext } from 'react';
import '../Css/PlanetApp.css'; // Asegúrate de tener un archivo CSS para los estilos

function Planet({ userID, isWhitelisted, isHolder }) {
  console.log("From planet.js: " + userID );
  console.log("Whitelist: " + isWhitelisted);
  console.log("NFT Holder: " + isHolder);

  const handleSatellite5Click = () => {
    if (isWhitelisted || isHolder) {
      window.location.href = '/MissionMenu';
    } else {
      alert('Access denied: Only Whitelisted or Beta Testers can access this satellite.');
    }
  };

  const handleSatellite8Click = () => {
    if (isWhitelisted) {
      window.location.href = '/NpcMarketplace';
    } else {
      alert('Access denied: Only Whitelisted players can access this satellite.');
    }
  };

  return (
    <div className="planet">
      <div id="earth"></div>
      <div id="satellite1" className="satellite disabled">
        <div className="satellite-label">Druid's Spaceship</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite2" className="satellite disabled">
        <div className="satellite-label">Arsenal Satelite</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite3" className="satellite disabled">
        <div className="satellite-label">Crafting Spacecraft</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite4" className="satellite disabled">
        <div className="satellite-label">Moon Base</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite5" className={`satellite ${!userID || (!isWhitelisted && !isHolder) ? 'disabled' : ''}`} onClick={handleSatellite5Click}>
        <div className="satellite-label">Mission Spacecraft</div>
        <div className="coming-soon yellow">🥼Beta Testers Only</div>
      </div>
      <div id="satellite6" className="satellite disabled">
        <div className="satellite-label">Space Pizzeria</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite7" className="satellite disabled">
        <div className="satellite-label">Enchantment Spacecraft</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite8" className={`satellite ${!userID || !isWhitelisted ? 'disabled' : ''}`} onClick={handleSatellite8Click}>
        <div className="satellite-label" >Jeweler's Spaceship</div>
        <div className="coming-soon yellow">👷‍♂️Men at Work</div>
      </div>
    </div>
  );
}

export default Planet;
