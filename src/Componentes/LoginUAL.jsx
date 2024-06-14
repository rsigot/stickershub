import React, { useState, useEffect, useContext } from 'react';
import { UALContext } from 'ual-reactjs-renderer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { db } from '../Firebase/firebase.js';
import { setDoc, collection, query, where, getDocs, updateDoc, doc, getDoc, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import './Css/LoginUAL.css';
import logo from '../Img/Logo-sh1-text.png';

const sessionID = navigator.userAgent;

export const LoginUAL = ({ onLogin }) => { // Función por defecto
    const [userID, setUserID] = useState(null);
    const [isWhitelisted, setIsWhitelisted] = useState(false);
    const [isHolder, setIsHolder] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [coins, setCoins] = useState(null); // Estado para almacenar el valor de coins
    const [loggedIn, setLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const usersCol = collection(db, "users");
    const ual = useContext(UALContext);

    useEffect(() => {
        if (ual?.activeUser) {
            const fetchUserBalance = async () => {
                const userWallet = ual.activeUser.accountName;
                setUserID(userWallet);
                checkPermissions(userWallet);
                fetchCoins(userWallet);
            };
            fetchUserBalance();
        }
    }, [ual?.activeUser]);

    // Función para obtener el balance de SHCoins del usuario
    const fetchCoins = async (userID) => {
        try {
            const userDocRef = collection(db, 'users');
            const q = query(userDocRef, where('wallet', '==', userID));
            const userDoc = await getDocs(q);
            if (!userDoc.empty) {
                const userData = userDoc.docs[0].data();
                setCoins(userData.coins || 0);
            } else {
                console.error('No such document!');
                setCoins(0);
            }
        } catch (error) {
            console.error('Error fetching coins:', error);
            setCoins(0);
        }
    };

    const setSessionToken = async (userID) => {
        const sessionToken = uuidv4();
        const userDocRef = doc(db, 'users', userID);
    
        try {
          await updateDoc(userDocRef, { sessionToken });
          localStorage.setItem('sessionToken', sessionToken);
        } catch (error) {
          console.error('Error setting session token:', error);
        }
      };

    const checkWhitelistStatus = async (userID) => {
        //const cacheKey = `whitelistStatus_${userID}`;
        //const cachedStatus = localStorage.getItem(cacheKey);

        //if (cachedStatus !== null) {
        //    return JSON.parse(cachedStatus);
        //}

        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('wallet', '==', userID));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                const isWhitelisted = userData.whitelist === true;
                //localStorage.setItem(cacheKey, JSON.stringify(isWhitelisted));

                return isWhitelisted;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking whitelist status:', error);
            return false;
        }
    }

    const checkPermissions = async (userID) => {
        const isWhitelisted = await checkWhitelistStatus(userID);
        setIsWhitelisted(isWhitelisted);

        const isHolder = await checkIfHolder(userID);
        setIsHolder(isHolder);

        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('wallet', '==', userID));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                await updateDoc(userDocRef, { HolderBetaTester: isHolder });
            } else {
                await setDoc(doc(usersRef, userID), {
                    wallet: userID,
                    HolderBetaTester: isHolder,
                    whitelist: isWhitelisted
                });
            }

            // Aseguramos que onLogin se llame aquí después de obtener todos los datos
            onLogin(userID, isWhitelisted, isHolder);
        } catch (error) {
            console.error('Error checking user permissions:', error);
        }
    };

    const checkIfHolder = async (userID) => {
        try {
            const response = await axios.get('https://wax.api.atomicassets.io/atomicassets/v1/accounts', {
                params: {
                    template_id: 803810, // BETA ACCESS 803810
                    page: 1,
                    limit: 100,
                    order: 'desc'
                }
            });

            return response.data.data.some(account => account.account === userID);
        } catch (error) {
            console.error('Error checking if user is holder:', error);
            return false;
        }
    };

    const handleLogin = async () => {
        if (ual && typeof ual.showModal === 'function') {
            setLoading(true);
            ual.showModal();
            alta();
            if (ual.activeUser) {
              const accountName = await ual.activeUser.getAccountName();
              setUserID(accountName);
              await setSessionToken(accountName);  // Llamar a la función para establecer el token de sesión
            }
          } else {
            console.error('ual.showModal is not a function or ual is not defined');
          }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        ual.logout();
        onLogin(null);
        setCoins(null); // Limpiar el valor de coins al cerrar sesión
        navigate('/'); // Redirigir al usuario a la página de inicio
    };

    const alta = async () => {
        try {
            const userWallet = userID;
            const userQuery = query(usersCol, where('wallet', '==', userWallet));
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                // Usuario ya existe, actualizar lastActive
                const userDoc = querySnapshot.docs[0];
                await updateDoc(userDoc.ref, { lastActive: new Date() });
                console.log("User already exists, lastActive updated: " + userWallet);

                // Obtener y almacenar el valor de coins y whitelist
                const userData = userDoc.data();
                //setCoins(userData.coins);
                setIsWhitelisted(userData.whitelist === true);

            } else {
                // Usuario no existe, crear nuevo documento con wallet, lastActive, coins y whitelist
                await addDoc(usersCol, {
                    wallet: userWallet,
                    lastActive: new Date(),
                    coins: 0,
                    whitelist: false
                });
                console.log('Document added successfully: ' + userWallet);
                setCoins(0); // Asignar 0 a coins para el nuevo usuario
                setIsWhitelisted(false);
                setShowMenu(true);
            }
            
            setLoggedIn(true);
            //onLogin(userWallet);
        } catch (error) {
            console.error("Error adding or updating document: " + error);
        }
    }

    const goBack = () => {
        navigate(-1); // Volver al historial anterior
    }

    return (
        <div className="login">
            <Link to="/">
                <div className="title">
                    <img src={logo} alt="STICKERS HUB" className="logo-image" />
                    <br />(BETA VERSION)
                </div>
            </Link>
            {location.pathname !== '/' && (
                <button className="goBack" onClick={goBack}>⏪ Go Back</button>
            )}
            {ual?.activeUser ? (
                <>
                    <button className="WAXUALbutton" onClick={handleLogout}>🚪 Logout</button>
                    <p className="walletspan">
                        Welcome: {userID}
                        <br /> <br /> {isWhitelisted && " (WHITELIST) "}
                        <br /> {isHolder && (" (BETA TESTER) ")}
                        <br /> {isHolder && (
                            <img
                                src="https://atomichub-ipfs.com/ipfs/QmeP4ph9TXJGRVJfEEfXkU7YpLtAfpgsHXMcYxMmuZowUZ"
                                alt="Beta Tester"
                                style={{ width: '100%' }}
                            />
                        )}
                        <br /> <br /> SHCOINS: {coins} <img className="coins" src="https://i.imgur.com/5MbUxQA.png" alt="Coins" />
                    </p>
                </>
            ) : (
                <>
                    <button className="WAXUALbutton" onClick={handleLogin}>🚀 Login</button>
                    <p className="walletspan">Please Login</p>
                </>
            )}
        </div>
    );
}
