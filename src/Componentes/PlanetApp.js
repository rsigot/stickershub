// src/components/PlanetApp.js
import React, { useState } from 'react';
import './Css/PlanetApp.css';
import Planet from './Js/Planet';
import ButtonsContainer from './Js/ButtonsContainer';
import { LoginUAL } from './LoginUAL.jsx'; // Asegúrate de importar tu componente de login

function PlanetApp() {
    const [userID, setUserID] = useState(null);
    const [isWhitelisted, setIsWhitelisted] = useState(false);
    const [isHolder, setIsHolder] = useState(false);

    const handleLogin = (userID, isWhitelisted, isHolder) => {
        setUserID(userID);
        setIsWhitelisted(isWhitelisted);
        setIsHolder(isHolder);
    };

    return (
        <div className="planet-app">
            <div className="login-container">
                <LoginUAL onLogin={handleLogin} />
            </div>
            <Planet userID={userID} isWhitelisted={isWhitelisted} isHolder={isHolder} />
            <ButtonsContainer userID={userID} />
        </div>
    );
}

export default PlanetApp;
