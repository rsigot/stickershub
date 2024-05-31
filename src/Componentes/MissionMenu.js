import React, { useState, useEffect } from 'react';
import { LoginUAL } from './LoginUAL.jsx';
import './Css/MissionMenu.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MissionGameButtons from './Js/MissionGameButtons.js';

// Función para verificar el estado de whitelist en Firestore
async function checkWhitelistStatus(userID) {
    try {
        console.log('Buscando usuario en la whitelist:', userID);
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('wallet', '==', userID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log('Documentos encontrados para el usuario:', userID);
            const userData = querySnapshot.docs[0].data(); // Asumimos que solo hay un documento por usuario

            // Convertir el valor del campo whitelist a un booleano explícito
            const isWhitelisted = userData.whitelist === true;

            if (isWhitelisted) {
                console.log('Usuario en whitelist:', userID);
                return true;
            } else {
                console.log('Usuario no está en whitelist:', userID);
                return false;
            }
        } else {
            console.error('No se encontró ningún documento para el usuario:', userID);
            return false;
        }
    } catch (error) {
        console.error('Error checking whitelist status:', error);
        return false;
    }
}

export default function MissionMenu() {
    const [userID, setUserID] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userID) {
            console.log('Verificando estado de whitelist para el usuario:', userID);
            // Llamamos a la API para verificar el estado de whitelist
            checkWhitelistStatus(userID).then(isWhitelisted => {
                if (!isWhitelisted) {
                    console.log('Usuario no está en whitelist. Mostrando modal.');
                    setShowModal(true);
                } else {
                    console.log('Usuario está en whitelist. Permitiendo acceso.');
                }
            });
        }
    }, [userID]);

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <>
        <div className="image"> 
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>You are on the blacklist!</p>
                        <button onClick={handleModalClose}>Accept</button>
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
