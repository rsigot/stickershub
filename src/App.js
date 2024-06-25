
import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MissionMenu from './Componentes/MissionMenu';
import PlanetApp from './Componentes/PlanetApp';
import NotFound from './Componentes/Js/NotFound';
import NpcJewelry from './Componentes/NpcJewelry';
import Dashboard from './Componentes/Dashboard';
import Home from './Componentes/Home';

const MissionGame = lazy(() => import('./Componentes/Js/MissionGame'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProfitTracker" element={<PlanetApp />} />
        <Route path="/MissionMenu" element={<MissionMenu />} />
        <Route path='/MissionGame' element={<MissionGame />} />
        <Route path='/NpcJewelry' element={<NpcJewelry />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* Otras rutas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    </BrowserRouter >
  );
}

export default App;
