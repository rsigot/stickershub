import '../Css/MissionMenu.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import React, { startTransition } from 'react';

// parámetros de las misiones: duración en segundos , nombre.
const missions = [
  [20, "Flash"],
  [1800, "Short"],
  [3600, "Moderate"],
  [7200, "Long"],
  [14400, "Extensive"],
  [28800, "Elite"]
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
    <div class="container-menu">
      <div className="grid">
        {missions.slice(0, 6).map((mission, index) => (
          <div className="grid-item" key={index}>
            <h2>{mission[1]} Mission</h2>
            <h4>Possible Rewards: Max {mission[0] < 7200 ? 'Basic' : mission[0] < 14400 ? 'Rare' : mission[0] < 28800 ? 'Epic' : 'Legendary'}</h4>
            <h4>Duration: {formatDuration(mission[0])}</h4>
            <button className="button-menu" onClick={() => handleSelectMission(mission)}>
              Launch Mission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MissionGameButtons;

