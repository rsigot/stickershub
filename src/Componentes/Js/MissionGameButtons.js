import '../Css/MissionMenu.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getActiveMission } from './MissionGameJS.js'; // Importa la nueva función

// parámetros de las misiones: duración en segundos , nombre.
const missions = [
  [10, "Moon"], // 45 minutos  2700
  [11, "Mars"], // 90 minutos  5400
  [12, "Jupiter"], // 3 horas  10800
  [21600, "Alpha Centauri"], // 6 horas
  [43200, "Andromeda Galaxy"], // 12 horas
  [86400, "Deep Space"] // 24 horas
];

export function MissionGameButtons({ userID }) {
  const navigate = useNavigate();
  const [activeMission, setActiveMission] = useState(null);

  useEffect(() => {
    const fetchActiveMission = async () => {
      if (userID) {
        try {
          const missionName = await getActiveMission(userID);
          setActiveMission(missionName);
        } catch (error) {
          console.error('Error fetching active mission:', error);
        }
      }
    };
    fetchActiveMission();
  }, [userID]);

  const handleSelectMission = (mission) => {
    const [duration, name] = mission;
    navigate('/MissionGame', {
      state: { userID, duration, name }
    });
  };

  const formatDuration = (seconds) => {
    if (seconds < 7200) {
      return `${Math.ceil(seconds / 60)} minutes`;
    } else {
      return `${Math.ceil(seconds / 3600)} hours`;
    }
  };

 
  return (
    <div className="container-menu">
      <div className="grid">
        {missions.slice(0, 6).map((mission, index) => {
          const [duration, name] = mission;
          let isButtonEnabled = false;

          if (activeMission) {
            isButtonEnabled = activeMission === name;
          } else {
            isButtonEnabled = ["Moon", "Mars", "Jupiter"].includes(name);
          }

          return (
            <div className="grid-item" key={index}>
              <h2>{name} Mission</h2>
              <h3>Possible Rewards: Max {duration < 7200 ? 'Basic' : duration < 14400 ? 'Rare' : duration < 28800 ? 'Epic' : 'Legendary'}</h3>
              <h3>Duration: {formatDuration(duration)}</h3>
              {duration >= 21600 ? (
                <>
                  <button className="button-menu disabled" disabled>
                    Launch Mission 🚀
                  </button>
                  <div className="coming-soon">Coming Soon</div>
                </>
              ) : (
                <button
                  className={`button-menu ${!isButtonEnabled ? 'disabled' : ''}`}
                  onClick={() => handleSelectMission(mission)}
                  disabled={!isButtonEnabled}
                >
                  Launch Mission 🚀
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MissionGameButtons;
