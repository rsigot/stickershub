// src/components/PlanetApp.js
import React, { useState } from 'react';
import './Css/PlanetApp.css';
import Planet from './Js/Planet';
import ButtonsContainer from './Js/ButtonsContainer';
import { LoginUAL } from './LoginUAL.jsx'; // Asegúrate de importar tu componente de login

function PlanetApp() {
    const [userID, setUserID] = useState(null);

    return (
        <div className="planet-app">
            
            <div className="login-container">
                <LoginUAL onLogin={setUserID} />
            </div>
            <Planet />
            <ButtonsContainer />
            
        </div>
    );
}

export default PlanetApp;
