import '../Css/MissionMenu.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import React, { startTransition } from 'react';

// parámetros de las misiones: duración en segundos , nombre.
const missions = [
  [3600, "Moon"], // 1 hora
  [7200, "Mars"], // 2 horas
  [14400, "Jupiter"], // 4 horas
  [28800, "Alpha Centauri"], // 8 horas
  [57600, "Andromeda Galaxy"], // 16 horas
  [115200, "Deep Space"] // 32 horas
];

export function MissionGameButtons({ userID }) {
  const navigate = useNavigate();

  const handleSelectMission = (mission) => {
    const [duration, name] = mission;
    startTransition(() => {
      navigate('/MissionGame', {
        state: { userID, duration, name }
      });
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
        {missions.slice(0, 6).map((mission, index) => (
          <div className="grid-item" key={index}>
            <h2>{mission[1]} Mission</h2>
            <h3>Possible Rewards: Max {mission[0] < 7200 ? 'Basic' : mission[0] < 14400 ? 'Rare' : mission[0] < 28800 ? 'Epic' : 'Legendary'}</h3>
            <h3>Duration: {formatDuration(mission[0])}</h3>
            {mission[0] >= 28800 ? (
              <>
                <button className="button-menu disabled" disabled>
                  Launch Mission 🚀
                </button>
                <div className="coming-soon">Coming Soon</div>
              </>
            ) : (
              <button className="button-menu" onClick={() => handleSelectMission(mission)}>
                Launch Mission 🚀
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MissionGameButtons;
