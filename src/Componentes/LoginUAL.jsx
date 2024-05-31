import React, { useContext, useState, useEffect } from 'react';
import { UALContext } from 'ual-reactjs-renderer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Css/LoginUAL.css';
import { collection, addDoc, query, where, getDocs, updateDoc, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebase.js';
import logo from '../Img/Logo-sh1-text.png';

const cache = {}; // Cache para almacenar datos que no cambian con frecuencia

// Función para verificar el estado de whitelist en Firestore
async function checkWhitelistStatus(userWallet) {
    if (cache[userWallet]) {
        return cache[userWallet].isWhitelisted;
    }

    try {
        console.log('Buscando usuario en la whitelist:', userWallet);
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('wallet', '==', userWallet));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const isWhitelisted = userData.whitelist === true;

            cache[userWallet] = { isWhitelisted }; // Guardar en cache

            return isWhitelisted;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking whitelist status:', error);
        return false;
    }
}

export function LoginUAL({ onLogin }) {
    const ual = useContext(UALContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [coins, setCoins] = useState(null); // Estado para almacenar el valor de coins
    const [isWhitelisted, setIsWhitelisted] = useState(false); // Estado para almacenar el estado de whitelist
    const usersCol = collection(db, "users");
    const [showMenu, setShowMenu] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (ual?.activeUser) {
            alta();
        }
    }, [ual?.activeUser]);

    useEffect(() => {
        // Verificar si hay un usuario activo antes de suscribirse al snapshot
        if (ual?.activeUser?.accountName) {
            const userDocRef = doc(db, 'users', ual.activeUser.accountName);
            const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const newData = docSnapshot.data();
                    setCoins(newData.coins);
                }
            });

            // Cleanup function para desuscribirse
            return () => unsubscribe();
        }
    }, [ual?.activeUser?.accountName]);

    const alta = async () => {
        try {
            const userWallet = ual.activeUser.accountName;
            const userQuery = query(usersCol, where('wallet', '==', userWallet));
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                // Usuario ya existe, actualizar lastActive
                const userDoc = querySnapshot.docs[0];
                await updateDoc(userDoc.ref, { lastActive: new Date() });
                console.log("Usuario ya existe, lastActive actualizado: " + userWallet);

                // Obtener y almacenar el valor de coins
                const userData = userDoc.data();
                setCoins(userData.coins);

                // Verificar el estado de whitelist
                const isWhitelisted = await checkWhitelistStatus(userWallet);
                setIsWhitelisted(isWhitelisted);
            } else {
                // Usuario no existe, crear nuevo documento con wallet, lastActive y coins
                const newUserDoc = await addDoc(usersCol, {
                    wallet: userWallet,
                    lastActive: new Date(),
                    coins: 0
                });
                console.log('Documento agregado correctamente: ' + userWallet);
                setCoins(0); // Asignar 0 a coins para el nuevo usuario
                setShowMenu(true);

                // Verificar el estado de whitelist
                const isWhitelisted = await checkWhitelistStatus(userWallet);
                setIsWhitelisted(isWhitelisted);
            }
            setLoggedIn(true);
            onLogin(userWallet);
        } catch (error) {
            console.error("Error agregando o actualizando documento: " + error);
        }
    }

    const login = async () => {
        await ual.showModal();
    }

    const logout = () => {
        setLoggedIn(false);
        ual.logout();
        onLogin(null);
        setCoins(null); // Limpiar el valor de coins al cerrar sesión
    }

    const goBack = () => {
        navigate(-1); // Volver al historial anterior
    }

    return (
        <div className="login">
            <Link to="/">
                <div className="title">
                    <img src={logo} alt="STICKERS HUB" className="logo-image" />
                    <br />(ALPHA VERSION)
                </div>
            </Link>
            {location.pathname !== '/' && (
                <button className="goBack" onClick={goBack}>⏪ Go Back</button>
            )}
            {ual?.activeUser ? (
                <>
                    <button className="WAXUALbutton" onClick={logout}>🚪 Logout</button>
                    <p className="walletspan">
                        Welcome: {ual.activeUser.accountName} <br /> {isWhitelisted && "(WHITELIST)"}
                        <br />
                        Balance: {coins} <img className="coins" src="https://i.imgur.com/5MbUxQA.png" alt="Coins" />
                    </p>
                </>
            ) : (
                <>
                    <button className="WAXUALbutton" onClick={login}>🚀 Login</button>
                    <p className="walletspan">Please Login</p>
                </>
            )}
        </div>
    );
}

export default LoginUAL;
