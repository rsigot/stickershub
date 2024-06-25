import '../Css/MissionMenu.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getActiveMission } from './MissionGameJS.js'; // Importa la nueva función

// parámetros de las misiones: duración en segundos , nombre.
const missions = [
  [2700, "Moon"], // 45 minutos  
  [5400, "Mars"], // 90 minutos  
  [10800, "Jupiter"], // 3 horas 
  [21600, "Alpha Centauri"], // 6 horas
  [43200, "Andromeda Galaxy"], // 12 horas
  [86400, "Deep Space"] // 24 horas
];

export function MissionGameButtons({ userID }) {
  const navigate = useNavigate();
  const [activeMission, setActiveMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveMission = async () => {
      if (userID) {
        try {
          const mission = await getActiveMission(userID);
          setActiveMission(mission);
        } catch (error) {
          console.error('Error fetching active mission:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-menu">
      <div className="grid">
        {missions.map((mission, index) => {
          const [duration, name] = mission;
          let isButtonEnabled = false;
          let onClickFunction = null;

          // Siempre deshabilitar misiones de 6 horas o más
          if (duration < 21600) {
            if (activeMission && activeMission.name === name) {
              isButtonEnabled = true;
              onClickFunction = () => handleSelectMission(mission);
            } else if (!activeMission && ["Moon", "Mars", "Jupiter"].includes(name)) {
              isButtonEnabled = true;
              onClickFunction = () => handleSelectMission(mission);
            }
          }

          return (
            <div className="grid-item" key={index}>
              <h3>{name} Mission</h3>
              <h4>Possible Max Rewards: {duration < 21600 ? 'Basic' : duration < 43200 ? 'Rare' : duration < 86400 ? 'Epic' : 'Legendary'}</h4>
              <h4>Duration: {formatDuration(duration)}</h4>
              {duration >= 21600 ? (
                <>
                  <button className="button-menu disabled" disabled>
                    Launch Mission 🚀
                  </button>
                  <div className="coming-soon">Coming Soon</div>
                </>
              ) : (
                <button
                  className={`button-menu ${isButtonEnabled ? '' : 'disabled'}`}
                  onClick={onClickFunction}
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
