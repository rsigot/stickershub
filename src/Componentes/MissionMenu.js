import React, { useState, useEffect, useContext } from 'react';
import { LoginUAL } from './LoginUAL.jsx';
import './Css/MissionMenu.css';
import { useNavigate } from 'react-router-dom';
import MissionGameButtons from './Js/MissionGameButtons.js';
import { UALContext } from 'ual-reactjs-renderer';

export default function MissionMenu() {
  const [userID, setUserID] = useState(null);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const navigate = useNavigate();
  const ual = useContext(UALContext);

  useEffect(() => {
    if (ual.activeUser) {
      ual.activeUser.getAccountName().then((accountName) => {
        setUserID(accountName);
      });
    }
  }, [ual.activeUser]);

  const handleBlacklistModalClose = () => {
    setShowBlacklistModal(false);
    navigate('/');
  };

  return (
    <>
      <div className="image">
        {showBlacklistModal && (
          <div className="modal">
            <div className="modal-content">
              <p>You are on the blacklist!</p>
              <button onClick={handleBlacklistModalClose}>Accept</button>
            </div>
          </div>
        )}

        <div className="login-container">
          <LoginUAL onLogin={setUserID} />
        </div>

        <div>
          <MissionGameButtons userID={userID} />
        </div>
      </div>
    </>
  );
}
