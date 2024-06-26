import { writeBatch, runTransaction, collection, addDoc, doc, updateDoc, getDocs, getDoc, query, where, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase.js';
import { generateCritterReward, generateGemReward, generateCubeReward, generateCoinReward, prize } from './MissionRewards.js';
import { nuevoMint } from './MissionGameMint.js';

let cachedUserData = {};
const cache = {};

export const checkForMultipleStartedMissions = async (userID) => {
  const missionsCol = collection(db, "missions");
  const q = query(missionsCol, where("userId", "==", userID), where("status", "==", "started"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 1) {
    const batch = writeBatch(db);
    querySnapshot.docs.forEach((doc, index) => {
      if (index > 0) { // Skip the first document
        const docRef = doc.ref;
        batch.update(docRef, { status: "canceled" });
      }
    });
    await batch.commit();
  }
};

export const updateBalances = async (userWallet, amount, userData, setUserData) => {
  if (userData) {
    const newUserBalance = userData.coins + amount;
    setUserData(prevUserData => ({ ...prevUserData, coins: newUserBalance }));
    cachedUserData[userWallet] = { ...userData, coins: newUserBalance };
    console.log(`Saldo actualizado para ${userWallet}: ${newUserBalance}`);
  } else {
    const userDoc = await findUserByWallet(userWallet);
    // Resto del código...
  }
};

// Nueva función para iniciar misión usando una transacción
export const startMissionTransaction = async (userID, mission, setMissionStarted, setMissionStatus, setMissionDocID, setError, navigate) => {
  const missionsCol = collection(db, "missions");

  try {
    await runTransaction(db, async (transaction) => {
      const q = query(missionsCol, where("userId", "==", userID), where("status", "==", "started"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('Ya tienes una misión en progreso.');
        alert('Ya tienes una misión en progreso.');
        throw new Error('Ya tienes una misión en progreso.');
      }

      setMissionStarted(true);
      setMissionStatus('in-progress');

      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + mission.duration * 1000);

      const docRef = doc(missionsCol); // Genera una referencia de documento nueva
      transaction.set(docRef, {
        userId: userID,
        name: mission.name,
        duration: mission.duration,
        startTime: startTime,
        endTime: endTime,
        status: "started",
        activeSession: navigator.userAgent
      });
      setMissionDocID(docRef.id);
      console.log("Mission started and saved to Firestore");
    });
  } catch (error) {
    console.error("Error adding document in transaction:", error);
  }
};

export const checkActiveMission = async (userID) => {
  const missionsCol = collection(db, "missions");
  const q = query(missionsCol, where("userId", "==", userID), where("status", "==", "started"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    return null;
  }
};

export const findUserByWallet = async (userWallet) => {
  if (cachedUserData[userWallet]) {
    return { data: () => cachedUserData[userWallet] };
  }

  const usersCol = collection(db, 'users');
  const userQuery = query(usersCol, where('wallet', '==', userWallet));
  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    cachedUserData[userWallet] = userDoc.data();
    return userDoc;
  } else {
    return null;
  }
};

export const handleClaimRewards = async (
  missionDocID,
  rewards,
  coinReward,
  userData,
  setUserData,
  setBotonDeshabilitado,
  handleCloseMissionComplete
) => {
  setBotonDeshabilitado(true);

  try {
    console.log('Starting to claim rewards...');
    const missionDocRef = doc(db, "missions", missionDocID);
    const missionDoc = await getDoc(missionDocRef);

    console.log('Mission document:', missionDoc.data());

    if (!missionDoc.exists() || missionDoc.data().claimed) {
      alert("Rewards have already been claimed or mission document does not exist.");
      setBotonDeshabilitado(false);
      return;
    }

    await updateDoc(missionDocRef, { claimed: true });
    console.log('Updated mission document to claimed.');

    const rewardsData = missionDoc.data().rewards;
    const nftRewards = rewardsData.nftRewards;
    const coinRewardValue = rewardsData.coinReward;

    if (nftRewards.length > 0) {
      console.log('Minting NFTs:', nftRewards);
      await nuevoMint(nftRewards, userData.wallet);
    }

    if (coinRewardValue > 0) {
      console.log(`Transferring coins: ${coinRewardValue} from walletSH1 to ${userData.wallet}`);
      await updateUserCoins("walletSH1", -coinRewardValue);
      await updateUserCoins(userData.wallet, coinRewardValue);
      await recordTransaction("walletSH1", userData.wallet, coinRewardValue, `Reward for mission ${missionDoc.data().name}`);
      alert(`SHCoins transferred successfully: ${coinRewardValue} coins to your wallet.`);

      // Actualizar el estado de userData con el nuevo saldo de SHCoins
      setUserData((prevData) => ({
        ...prevData,
        coins: prevData.coins + coinRewardValue,
      }));
    }

    handleCloseMissionComplete();
  } catch (error) {
    console.error("Error claiming rewards: ", error);
    alert("Failed to claim rewards. Please try again.");
  } finally {
    setBotonDeshabilitado(false);
  }
};

export const getActiveMission = async (userID) => {
  const missionsCol = collection(db, "missions");
  const q = query(missionsCol, where("userId", "==", userID), where("status", "==", "started"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const missionData = doc.data();
    return {
      id: doc.id,
      ...missionData,
    };
  } else {
    return null;
  }
};

export const checkMissionStatus = async (userID, setMissionDocID, setRemainingTime, setMissionStarted, setMissionStatus, setMission, setError, navigate) => {
  const missionsCol = collection(db, "missions");
  const q = query(missionsCol, where("userId", "==", userID), where("status", "==", "started"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const missionData = doc.data();
    const currentTime = new Date();
    const endTime = missionData.endTime.toDate();
    const timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 1000));

    setMissionDocID(doc.id);
    setRemainingTime(timeLeft);
    setMissionStarted(true);
    setMissionStatus('in-progress');
    setMission(missionData);

    if (missionData.activeSession !== navigator.userAgent) {
      setError('The mission is already in progress on another device or browser.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }
};

export const completeMission = async (mission, missionDocID, setMissionStatus, setMissionStarted, setRewards, setCoinReward, userID) => {
  setMissionStatus('complete');
  setMissionStarted(false);

  const missionDocRef = doc(db, "missions", missionDocID);
  const missionDoc = await getDoc(missionDocRef);

  if (missionDoc.exists() && missionDoc.data().rewards) {
    setRewards(missionDoc.data().rewards.nftRewards);
    setCoinReward(missionDoc.data().rewards.coinReward || 0);
    return;
  }

  const allRewards = [
    generateCritterReward(mission.duration),
    generateGemReward(mission.duration),
    generateCubeReward(mission.duration),
  ].filter(reward => reward !== null && reward !== undefined);

  const nftRewards = allRewards
    .flatMap(rewards => {
      if (Array.isArray(rewards)) {
        return rewards.map(reward => {
          return {
            name: reward,
            image: prize[reward]?.imageURL || '',
            template: prize[reward]?.template,
            schema: prize[reward]?.schema,
          };
        });
      } else {
        return [];
      }
    })
    .filter(reward => reward !== null);

  const coinRewardValue = generateCoinReward(mission.duration);
  console.log("SHCoins: " + coinRewardValue);

  setRewards(nftRewards);
  setCoinReward(coinRewardValue || 0);

  try {
    await updateDoc(missionDocRef, {
      rewards: {
        nftRewards,
        coinReward: coinRewardValue || 0
      },
      status: "complete",
      claimed: false,
      activeSession: navigator.userAgent
    });
    console.log("Mission completed and rewards saved in Firestore");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const updateUserCoins = async (walletId, coins) => {
  const usersCol = collection(db, "users");
  const usersQuery = query(usersCol, where("wallet", "==", walletId));
  const querySnapshot = await getDocs(usersQuery);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userDocRef = doc(db, "users", userDoc.id);

    try {
      await updateDoc(userDocRef, { coins: userDoc.data().coins + coins });
      console.log(`User ${walletId} balance updated by ${coins} coins`);
    } catch (error) {
      console.error("Error updating user's coins:", error);
    }
  } else if (walletId === "walletSH1") {
    try {
      await addDoc(usersCol, {
        wallet: "walletSH1",
        coins: 21000000,
        whitelist: false,
        lastActive: new Date()
      });
      console.log("In-game wallet created with 21 million SHCOINS");
    } catch (error) {
      console.error("Error creating in-game wallet:", error);
    }
  } else {
    console.error(`User ${walletId} not found`);
  }
};

export const recordTransaction = async (origin, destination, amount, memo) => {
  try {
    const transactionsCol = collection(db, "transactions");
    await addDoc(transactionsCol, {
      date: new Date(),
      origin,
      destination,
      amount,
      memo
    });
    console.log("Transaction recorded successfully");
  } catch (error) {
    console.error("Error recording transaction:", error);
  }
};

export const getMissionRanking = async (missionName) => {
  if (cache[missionName]) {
    console.log('Using cached data for missionName:', missionName);
    return cache[missionName];
  }

  const missionsCol = collection(db, 'missions');
  const q = query(missionsCol, where('name', '==', missionName), where('status', '==', 'complete'));

  console.log('Executing query for missionName:', missionName);

  const querySnapshot = await getDocs(q);
  const missionCounts = querySnapshot.docs.reduce((counts, doc) => {
    const missionData = doc.data();
    const userId = missionData.userId;
    if (counts[userId]) {
      counts[userId]++;
    } else {
      counts[userId] = 1;
    }
    return counts;
  }, {});

  const sortedMissionCounts = Object.entries(missionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  console.log('Sorted mission counts:', sortedMissionCounts);

  cache[missionName] = sortedMissionCounts;

  return sortedMissionCounts;
};
