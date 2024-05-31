import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, updateDoc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/firebase.js';
import LoginUAL from '../LoginUAL.jsx';
import { generateCritterReward, generateGemReward, generateCubeReward, generateCoinReward, prize } from './MissionRewards.js';
import { getCritterDistribution, getGemDistribution, getCubesDistribution, getCoinsDistribution } from './MissionRewards.js';
import '../Css/MissionGame.css';
import { nuevoMint } from './MissionGameMint.js';

const usersCol = collection(db, "users");
const missionsCol = collection(db, "missions");

const getMissionRanking = async (missionName) => {
  const missionsCol = collection(db, 'missions');
  const q = query(missionsCol, where('name', '==', missionName), where('status', '==', 'complete'));

  const querySnapshot = await getDocs(q);
  const missionCounts = {};

  querySnapshot.forEach((doc) => {
    const missionData = doc.data();
    const userId = missionData.userId;

    if (missionCounts[userId]) {
      missionCounts[userId]++;
    } else {
      missionCounts[userId] = 1;
    }
  });

  const sortedMissionCounts = Object.entries(missionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return sortedMissionCounts;
};

export default function MissionGame() {
  const { state } = useLocation();
  const [userID, setUserID] = useState(state?.userID || null);
  const [mission, setMission] = useState(state);
  const [missionStarted, setMissionStarted] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [coinReward, setCoinReward] = useState(0); // Almacenar la recompensa de Coins
  const [rewardsVisible, setRewardsVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(mission?.duration || 0);
  const [missionStatus, setMissionStatus] = useState('default');
  const [missionDocID, setMissionDocID] = useState(null);
  const [error, setError] = useState(null);
  const [ranking, setRanking] = useState([]); // Estado para el ranking
  const navigate = useNavigate();

  useEffect(() => {


    
    // Verifica el estado de la misión al cargar el componente
    if (userID && mission) {
      checkMissionStatus();
    }

    // Configura un intervalo para verificar el estado de la misión periódicamente
    const interval = setInterval(() => {
      if (userID && mission) {
        checkMissionStatus();
      }
    }, 1000); // 1000ms = 1seg

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [userID, mission]);

  useEffect(() => {
    let timerInterval;

    if (missionStarted) {
      const endTime = Date.now() + remainingTime * 1000;
      timerInterval = setInterval(() => {
        const timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        setRemainingTime(timeLeft);
        if (timeLeft === 0) {
          clearInterval(timerInterval);
          completeMission();
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [missionStarted, remainingTime]);

  useEffect(() => {
    if (mission && mission.name) {
      // Obtener el ranking de misiones completadas
      getMissionRanking(mission.name).then(missionRanking => {
        setRanking(missionRanking);
      });
    }
  }, [mission]);

  const checkMissionStatus = async () => {
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
      setMission(missionData); // Set the ongoing mission
  
      // Verificar si la sesión activa es la misma que la del navegador actual
      if (missionData.activeSession !== navigator.userAgent) {
        setError('La misión ya está en progreso en otro dispositivo o navegador.');
        setTimeout(() => {
          navigate('/MissionMenu');
        }, 2000);
      }
    }
  };
  

  const handleStartMission = async () => {
    const q = query(missionsCol, where("userId", "==", userID), where("status", "==", "started"));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const ongoingMission = querySnapshot.docs[0].data();
  
      // Verificar si la misión está en progreso en otro dispositivo o navegador
      if (ongoingMission.activeSession && ongoingMission.activeSession !== navigator.userAgent) {
        setError('La misión ya está en progreso en otro dispositivo o navegador.');
        setTimeout(() => {
          navigate('/MissionMenu');
        }, 2000);
        return;
      }
    }
  
    setMissionStarted(true);
    setMissionStatus('in-progress');
  
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + mission.duration * 1000);
  
    try {
      const docRef = await addDoc(missionsCol, {
        userId: userID,
        name: mission.name,
        duration: mission.duration,
        startTime: startTime,
        endTime: endTime,
        status: "started",
        activeSession: navigator.userAgent // Establecer la sesión activa
      });
      setMissionDocID(docRef.id);
      console.log("Mission started and saved to Firestore");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  

  const completeMission = async () => {
    setMissionStatus('complete');
    setMissionStarted(false);

    // Verificar si las recompensas ya existen en Firestore
    const missionDocRef = doc(db, "missions", missionDocID);
    const missionDoc = await getDoc(missionDocRef);
    
    if (missionDoc.exists() && missionDoc.data().rewards) {
        // Leer las recompensas desde la base de datos
        setRewards(missionDoc.data().rewards.nftRewards);
        setCoinReward(missionDoc.data().rewards.coinReward || 0);
        return;
    }

    // Generar las recompensas si no existen
    const allRewards = [
        generateCritterReward(mission.duration),
        generateGemReward(mission.duration),
        generateCubeReward(mission.duration),
        generateCoinReward(mission.duration)
    ].filter(reward => reward !== null && reward !== undefined);

    const nftRewards = allRewards
        .flatMap(rewards => {
            if (Array.isArray(rewards)) {
                return rewards.map(reward => {
                    if (reward !== generateCoinReward(mission.duration)) {
                        return {
                            name: reward,
                            image: prize[reward]?.imageURL || '',
                            template: prize[reward]?.template,
                            schema: prize[reward]?.schema,
                        };
                    } else {
                        return null;
                    }
                });
            } else {
                return [];
            }
        })
        .filter(reward => reward !== null);

    const coinRewardValue = allRewards.find(reward => reward === generateCoinReward(mission.duration));

    setRewards(nftRewards);
    setCoinReward(coinRewardValue || 0);

    try {
        await updateDoc(missionDocRef, {
            rewards: {
                nftRewards,
                coinReward: coinRewardValue || 0
            },
            status: "complete",
            claimed: false, // Asegurarse de que el campo claimed esté presente
            activeSession: navigator.userAgent // Agregar campo activeSession
        });
        console.log("Mission completed and rewards saved in Firestore");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};


  const updateUserCoins = async (userId, coins) => {
    const q = query(usersCol, where("wallet", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "users", userDoc.id);

      try {
        await updateDoc(userDocRef, {
          coins: userDoc.data().coins + coins
        });
        console.log(`User ${userId} has been awarded ${coins} coins`);
        alert('You won ' + coins + ' coins!');
      } catch (error) {
        console.error("Error updating user's coins: ", error);
      }
    } else {
      console.error("User not found");
    }
  };

  const handleCloseMissionComplete = () => {
    setMissionStatus('default');
    setMissionDocID(null);
    setRemainingTime(mission.duration);
  };

  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);

  const handleClaimRewards = async () => {
    setBotonDeshabilitado(true); // Deshabilitar el botón al hacer clic

    const missionDocRef = doc(db, "missions", missionDocID);
    const missionDoc = await getDoc(missionDocRef);

    if (!missionDoc.exists()) {
      alert("Mission document does not exist.");
      setBotonDeshabilitado(false);
      return;
    }

    // Verificar si las recompensas ya fueron reclamadas
    if (missionDoc.data().claimed) {
      alert("Rewards have already been claimed.");
      setBotonDeshabilitado(false);
      return;
    }

    // Actualizar el campo claimed a true inmediatamente
    try {
      await updateDoc(missionDocRef, {
        claimed: true
      });
    } catch (error) {
      console.error("Error updating claimed status: ", error);
      alert("Failed to claim rewards. Please try again.");
      setBotonDeshabilitado(false);
      return;
    }

    // Leer las recompensas desde la base de datos
    const rewardsData = missionDoc.data().rewards;
    const nftRewards = rewardsData.nftRewards;
    const coinRewardValue = rewardsData.coinReward;

    // Proceder con el minting y la actualización de monedas
    if (nftRewards.length > 0) {
      await nuevoMint(nftRewards, userID);
    }
    if (coinRewardValue > 0) {
      await updateUserCoins(userID, coinRewardValue);
    }

    console.log("Rewards claimed and updated in Firestore");

    handleCloseMissionComplete();
    setBotonDeshabilitado(false); // Volver a habilitar el botón después de completar la operación
  };


  return (
    <>
      <div className="login-container">
        <LoginUAL onLogin={setUserID} />
      </div>

      <div className="container-game" id="container-game">
        <div className={`image-game ${missionStatus}`}></div>
        {userID && (
          <div className={`mission-details ${missionStatus === 'complete' ? 'hidden' : ''}`}>
            <button
              className={`start-mission-button ${missionStarted ? 'pressed' : ''}`}
              onClick={handleStartMission}
              disabled={missionStarted}
            >
              Start {mission.name} Mission Now!
            </button>
            {missionStatus === 'in-progress' && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${(1 - remainingTime / mission.duration) * 100}%` }}></div>
                <span className="progress-text">{mission.name} Mission in Progress</span>
              </div>
            )}
            <div className={`timer ${missionStatus === 'complete' ? 'hidden' : ''}`}>
              {Math.floor(remainingTime / 3600)}:
              {Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}:
              {(remainingTime % 60).toString().padStart(2, '0')}
            </div>
          </div>
        )}
        {rewards && (
          <div className={`possible-rewards-container ${missionStatus === 'complete' ? 'hidden' : ''}`}>
            <h3 onClick={() => setRewardsVisible(!rewardsVisible)}>Possible Rewards</h3>
            {rewardsVisible && (
              <>
                <div className="reward-section">
                  <h4>Critters</h4>
                  <ul>
                    {Object.entries(getCritterDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>{name}: {probability}%</li>
                    ))}
                  </ul>
                </div>
                <div className="reward-section">
                  <h4>Gems</h4>
                  <ul>
                    {Object.entries(getGemDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>{name}: {probability}%</li>
                    ))}
                  </ul>
                </div>
                <div className="reward-section">
                  <h4>Cubes</h4>
                  <ul>
                    {Object.entries(getCubesDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>{name}: {probability}%</li>
                    ))}
                  </ul>
                </div>
                <div className="reward-section">
                  <h4>Coins</h4>
                  <ul>
                    {Object.entries(getCoinsDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>You will earn <b>{probability} Coins</b> for completing this mission.</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
        {ranking.length > 0 && (
          <div className="ranking-container">
            <h3>{mission.name} Mission Top 3 </h3>
            <ul className="ranking-list">
              {ranking.map(([wallet, count], index) => (
                <li key={index} className="ranking-item">
                  <span className="ranking-wallet">{wallet}:</span>
                  <span className="ranking-count"> {count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {missionStatus === 'complete' && (
          <div className="mission-complete">
            <h3>Mission Complete! Rewards:</h3>
            <ul className="reward-list">
              {rewards.map((reward, index) => (
                <li key={index} className="reward-item">
                  <img src={reward.image} alt={reward.name} className="reward-image" />
                  <span className="reward-name">{reward.name}</span>
                </li>
              ))}
              {coinReward > 0 && (
                <li className="reward-item">
                  <img src={prize['Coins'].imageURL} alt="Coins" className="reward-image" />
                  <span className="reward-name">Coins {coinReward}</span>
                </li>
              )}
            </ul>
            <button onClick={handleClaimRewards} disabled={botonDeshabilitado} className='claim-button'>CLAIM REWARDS NOW!</button>
            <br />
            <button onClick={handleCloseMissionComplete} className='close-rewards-button'>CLOSE & REJECT REWARDS</button>
            <br />
          </div>
        )}
        {error && (
          <div className="error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </>
  );
}
