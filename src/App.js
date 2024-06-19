
import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MissionMenu from './Componentes/MissionMenu';
import PlanetApp from './Componentes/PlanetApp';
import NotFound from './Componentes/Js/NotFound';
import NpcMarketplace from './Componentes/NpcMarketplace';
import Dashboard from './Componentes/Dashboard';
const MissionGame = lazy(() => import('./Componentes/Js/MissionGame'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<PlanetApp />} />
        <Route path="/MissionMenu" element={<MissionMenu />} />
        <Route path='/MissionGame' element={<MissionGame />} />
        <Route path='/NpcMarketplace' element={<NpcMarketplace />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* Otras rutas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </BrowserRouter >
  );
}

export default App;
