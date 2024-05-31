import React from 'react';
import '../Css/PlanetApp.css'; // Asegúrate de tener un archivo CSS para los estilos

function Planet() {
  return (
    <div className="planet">
      <div id="earth"></div>
      <div id="satellite1" className="satellite">
        <div className="satellite-label">Druid's Spaceship</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite2" className="satellite">
        <div className="satellite-label">Arsenal Satelite</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite3" className="satellite">
        <div className="satellite-label">Crafting Spacecraft</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite4" className="satellite">
        <div className="satellite-label">Moon Base</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite5" className="satellite" onClick={() => window.location.href = '/MissionMenu'}>
        <div className="satellite-label">Mission Spacecraft</div>
      </div>
      <div id="satellite6" className="satellite">
        <div className="satellite-label">Space Pizzeria</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite7" className="satellite">
        <div className="satellite-label">Enchantment Spacecraft</div>
        <div className="coming-soon">Coming Soon</div>
      </div>
      <div id="satellite8" className="satellite" onClick={() => window.location.href = '/NpcMarketplace'}>
        <div className="satellite-label" >Jeweler's Spaceship</div>
        <div className="coming-soon yellow">👷‍♂️Men at Work</div>
      </div>
    </div>
  );
}

export default Planet;
