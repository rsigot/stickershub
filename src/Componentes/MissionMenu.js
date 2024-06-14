import React, { useState, useEffect, useContext } from 'react';
import { LoginUAL } from './LoginUAL.jsx';
import './Css/MissionMenu.css';
import { useNavigate } from 'react-router-dom';
import MissionGameButtons from './Js/MissionGameButtons.js';
import { UALContext } from 'ual-reactjs-renderer';
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

const sessionID = navigator.userAgent;

const createSessionToken = () => uuidv4();

const setActiveSession = async (userID, sessionToken) => {
  const userDocRef = doc(db, "users", userID);
  await updateDoc(userDocRef, { sessionToken });
  localStorage.setItem('sessionToken', sessionToken);
};

const checkActiveSession = async (userID, sessionToken) => {
  const userDocRef = doc(db, "users", userID);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.sessionToken === sessionToken;
  }
  return false;
};

export default function MissionMenu() {
  const [userID, setUserID] = useState(null);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sessionID = navigator.userAgent;
  const ual = useContext(UALContext);

  useEffect(() => {
    if (ual.activeUser) {
      ual.activeUser.getAccountName().then((accountName) => {
        setUserID(accountName);
      });
    }
  }, [ual.activeUser]);

  useEffect(() => {
    const verifySession = async () => {
      if (userID) {
        const sessionToken = localStorage.getItem('sessionToken') || createSessionToken();
        const isActive = await checkActiveSession(userID, sessionToken);
        if (!isActive) {
          await setActiveSession(userID, sessionToken);
        } else {
          //alert('You already have an active session on another device or browser.');
          //navigate('/'); // Redirigir al usuario a la página de inicio o a una página de error
        }
      }
      setLoading(false);
    };
    verifySession();
  }, [userID, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
