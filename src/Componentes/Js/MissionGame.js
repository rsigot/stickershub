import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUAL } from '../LoginUAL.jsx';
import { getCritterDistribution, getGemDistribution, getCubesDistribution, getCoinsDistribution, prize } from './MissionRewards.js';
import '../Css/MissionGame.css';
import {
  checkMissionStatus,
  startMissionTransaction,
  completeMission,
  handleClaimRewards,
  getMissionRanking,
  findUserByWallet,
  checkForMultipleStartedMissions,
  getActiveMission
} from './MissionGameJS.js';

const MissionGame = () => {
  const { state } = useLocation();
  const [userID, setUserID] = useState(state?.userID || null);
  const [mission, setMission] = useState(null); // Cambiado a null
  const [missionStarted, setMissionStarted] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [coinReward, setCoinReward] = useState(0);
  const [rewardsVisible, setRewardsVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0); // Cambiado a 0
  const [missionStatus, setMissionStatus] = useState('default');
  const [missionDocID, setMissionDocID] = useState(null);
  const [error, setError] = useState(null);
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveMissionData = async () => {
      if (userID) {
        const activeMission = await getActiveMission(userID);
        if (activeMission) {
          setMission(activeMission);
          setRemainingTime(activeMission.duration);
        } else if (state) {
          setMission(state);
          setRemainingTime(state.duration);
        }
      }
      setLoading(false);
    };

    fetchActiveMissionData();
  }, [userID, state]);

  useEffect(() => {
    if (userID && mission) {
      async function checkStatus() {
        console.log('Checking mission status...');
        await checkMissionStatus(userID, setMissionDocID, setRemainingTime, setMissionStarted, setMissionStatus, setMission, setError, navigate);
      }
      checkStatus();
    }
  }, [userID, mission, navigate]);

  useEffect(() => {
    let timerInterval;

    if (missionStarted) {
      const endTime = Date.now() + remainingTime * 1000;
      timerInterval = setInterval(() => {
        const timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        setRemainingTime(timeLeft);
        if (timeLeft === 0) {
          clearInterval(timerInterval);
          completeCurrentMission();
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [missionStarted, remainingTime]);

  useEffect(() => {
    if (mission && mission.name) {
      fetchBalanceAndRanking();
    }
  }, [mission?.name]);

  const fetchBalanceAndRanking = async () => {
    if (userID) {
      const userDoc = await findUserByWallet(userID);
      if (userDoc) {
        const data = userDoc.data();
        setUserData(data);
      }
    }

    if (mission && mission.name) {
      console.log('Fetching mission ranking for:', mission.name);
      const missionRanking = await getMissionRanking(mission.name);
      console.log('Mission ranking fetched:', missionRanking);
      setRanking(missionRanking);
    }
  };

  const completeCurrentMission = async () => {
    await checkForMultipleStartedMissions(userID);
    completeMission(mission, missionDocID, setMissionStatus, setMissionStarted, setRewards, setCoinReward, userID);
  };

  const claimRewards = async () => {
    console.log('Claiming rewards with missionDocID:', missionDocID, 'and userData:', userData);
    if (!userData) {
      alert("User data is not available. Please try again later.");
      return;
    }
    await handleClaimRewards(missionDocID, rewards, coinReward, userData, setUserData, setBotonDeshabilitado, handleCloseMissionComplete);
    fetchBalanceAndRanking();
    navigate(0);
  };

  const startMission = () => {
    startMissionTransaction(userID, mission, setMissionStarted, setMissionStatus, setMissionDocID, setError, navigate);
  };

  const handleCloseMissionComplete = () => {
    setMissionStatus('default');
    setMissionDocID(null);
    setRemainingTime(mission.duration);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
              onClick={startMission}
              disabled={missionStarted}
            >
              Start {mission?.name || 'Mission'} Mission Now!
            </button>
            {missionStatus === 'in-progress' && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${(1 - remainingTime / mission.duration) * 100}%` }}></div>
                <span className="progress-text">{mission?.name || 'Mission'} Mission in Progress</span>
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
            <h2 onClick={() => setRewardsVisible(!rewardsVisible)}>Possible Rewards</h2>
            {rewardsVisible && (
              <>
                <div className="reward-section">
                  <h3><br />Critters</h3>
                  <ul>
                    {Object.entries(getCritterDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>{name}: {probability}%</li>
                    ))}
                  </ul>
                </div>
                <div className="reward-section">
                  <h3>Gems</h3>
                  <ul>
                    {Object.entries(getGemDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>{name}: {probability}%</li>
                    ))}
                  </ul>
                </div>
                <div className="reward-section">
                  <h3>Cubes</h3>
                  <ul>
                    {Object.entries(getCubesDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>{name}: {probability}%</li>
                    ))}
                  </ul>
                </div>
                <div className="reward-section">
                  <h3>Coins</h3>
                  <ul>
                    {Object.entries(getCoinsDistribution(mission.duration)).map(([name, probability], index) => (
                      <li key={index}>You will earn <b>{probability} SHCoins</b> for completing this mission.</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
        {ranking.length > 0 && (
          <div className="ranking-container">
            <h2>{mission?.name || 'Mission'} Mission Top 3</h2><br />
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
                  <span className="reward-name">SHCoins: {coinReward}</span>
                </li>
              )}
            </ul>
            <button onClick={claimRewards} disabled={botonDeshabilitado} className='claim-button'>CLAIM REWARDS NOW!</button>
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
};

export default MissionGame;
