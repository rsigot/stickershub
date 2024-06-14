import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase.js';
import { LoginUAL } from './LoginUAL.jsx';
import { useNavigate } from 'react-router-dom';
import './Css/Dashboard.css';

const Dashboard = () => {
  const [missionsStats, setMissionsStats] = useState({});
  const [usersStats, setUsersStats] = useState([]);
  const [transactionsStats, setTransactionsStats] = useState({});
  const [userID, setUserID] = useState(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      checkWhitelistStatus(userID).then(isWhitelisted => {
        if (isWhitelisted) {
          setIsWhitelisted(true);
          fetchMissionsStats();
          fetchUsersStats();
          fetchTransactionsStats();
          setLastUpdated(new Date().toLocaleString());
        } else {
          alert('Access denied: You are not whitelisted');
          navigate('/');
        }
      });
    }
  }, [userID]);

  const checkWhitelistStatus = async (userID) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('wallet', '==', userID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData.whitelist === true;
    } else {
      return false;
    }
  };

  const fetchMissionsStats = async () => {
    const missionsCol = collection(db, 'missions');
    const missionsSnapshot = await getDocs(missionsCol);
    const missionsData = missionsSnapshot.docs.map(doc => doc.data());

    const totalStarted = missionsData.filter(mission => mission.status === 'started').length;
    const totalCompleted = missionsData.filter(mission => mission.status === 'complete').length;

    const missionsByName = missionsData.reduce((acc, mission) => {
      const durationHours = mission.duration / 3600;
      if (!acc[mission.name]) {
        acc[mission.name] = { started: 0, completed: 0, duration: durationHours };
      }
      if (mission.status === 'started') {
        acc[mission.name].started += 1;
      } else if (mission.status === 'complete') {
        acc[mission.name].completed += 1;
      }
      return acc;
    }, {});

    const sortedMissionsByName = Object.entries(missionsByName)
      .sort((a, b) => a[1].duration - b[1].duration)
      .reduce((acc, [name, stats]) => {
        acc[name] = stats;
        return acc;
      }, {});

    setMissionsStats({ totalStarted, totalCompleted, missionsByName: sortedMissionsByName });
  };

  const fetchUsersStats = async () => {
    const usersCol = collection(db, 'users');
    const missionsCol = collection(db, 'missions');
    const usersSnapshot = await getDocs(usersCol);
    const usersData = usersSnapshot.docs.map(doc => doc.data()).filter(user => user.wallet);

    const missionsSnapshot = await getDocs(missionsCol);
    const missionsData = missionsSnapshot.docs.map(doc => doc.data());

    const usersStats = usersData.map(user => {
      const userMissions = missionsData.filter(mission => mission.userId === user.wallet && mission.status === 'complete');
      const missionCounts = userMissions.reduce((acc, mission) => {
        if (!acc[mission.name]) {
          acc[mission.name] = 0;
        }
        acc[mission.name] += 1;
        return acc;
      }, {});
      const missionsCompleted = userMissions.length;
      return {
        wallet: user.wallet,
        coins: user.coins,
        missionsCompleted,
        ...missionCounts
      };
    });

    setUsersStats(usersStats);
  };

  const fetchTransactionsStats = async () => {
    const transactionsCol = collection(db, 'transactions');
    const transactionsSnapshot = await getDocs(transactionsCol);
    const transactionsData = transactionsSnapshot.docs.map(doc => doc.data());

    const totalTransactions = transactionsData.length;
    const totalAmountTransferred = transactionsData.reduce((acc, transaction) => acc + transaction.amount, 0);

    setTransactionsStats({ totalTransactions, totalAmountTransferred });
  };

  return (
    <div className="dashboard-container">
      <div className="login-section">
        <LoginUAL onLogin={setUserID} />
      </div>
      {userID && isWhitelisted && (
        <div className="stats-section">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Last Updated: {lastUpdated}</p>
          </div>
          <div className="section">
            <div className="section-header">
              <h2>Missions Stats</h2>
            </div>
            <div className="section-content">
              <div>Total Missions Started: {missionsStats.totalStarted}</div>
              <div>Total Missions Completed: {missionsStats.totalCompleted}</div>
              <h3>Missions by Name</h3>
              <table>
                <thead>
                  <tr>
                    <th>Mission Name</th>
                    <th>Duration (hours)</th>
                    <th>Started</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {missionsStats.missionsByName && Object.entries(missionsStats.missionsByName).map(([name, stats]) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{stats.duration.toFixed(2)}</td>
                      <td>{stats.started}</td>
                      <td>{stats.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="section">
            <div className="section-header">
              <h2>Users Stats</h2>
            </div>
            <div className="section-content">
              <table>
                <thead>
                  <tr>
                    <th>Wallet</th>
                    <th>Coins</th>
                    <th>Missions Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {usersStats.map((user, index) => (
                    <tr key={user.wallet}>
                      <td>{user.wallet}</td>
                      <td>{user.coins}</td>
                      <td>{user.missionsCompleted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="section">
            <div className="section-header">
              <h2>Missions by Users</h2>
            </div>
            <div className="section-content">
              <table>
                <thead>
                  <tr>
                    <th>Wallet</th>
                    <th>Moon</th>
                    <th>Mars</th>
                    <th>Jupiter</th>
                    <th>Alpha Centauri</th>
                    <th>Andromeda Galaxy</th>
                    <th>Deep Space</th>
                  </tr>
                </thead>
                <tbody>
                  {usersStats.map((user, index) => (
                    <tr key={user.wallet}>
                      <td>{user.wallet}</td>
                      <td>{user.Moon || 0}</td>
                      <td>{user.Mars || 0}</td>
                      <td>{user.Jupiter || 0}</td>
                      <td>{user["Alpha Centauri"] || 0}</td>
                      <td>{user["Andromeda Galaxy"] || 0}</td>
                      <td>{user["Deep Space"] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="section">
            <div className="section-header">
              <h2>Transactions Stats</h2>
            </div>
            <div className="section-content">
              <div>Total Transactions: {transactionsStats.totalTransactions}</div>
              <div>Total Amount Transferred: {transactionsStats.totalAmountTransferred}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
