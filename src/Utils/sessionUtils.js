import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase.js';

export const checkSessionValidity = async (userID) => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return false;

    const sessionRef = doc(db, 'sessions', sessionId);
    const docSnap = await getDoc(sessionRef);

    if (docSnap.exists()) {
        const sessionData = docSnap.data();
        if (sessionData.userID === userID) {
            return true;
        }
    }
    return false;
};

export const invalidateSession = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        localStorage.removeItem('sessionId');
        // Aquí puedes realizar otras acciones necesarias en tu backend para invalidar la sesión en Firestore, etc.
    }
};
