import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import DashboardChauffeur from './pages/DashboardChauffeur';
import DashboardDispatcher from './pages/DashboardDispatcher';
import DashboardFacturation from './pages/DashboardFacturation';
import DashboardDirection from './pages/DashboardDirection';

function PrivateRoute({ children }: { children: React.ReactElement }) {  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function RoleRoute() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  switch (user.role) {
    case 'chauffeur': return <DashboardChauffeur />;
    case 'dispatcher': return <DashboardDispatcher />;
    case 'facturation': return <DashboardFacturation />;
    case 'direction': return <DashboardDirection />;
    default: return <Dashboard />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><RoleRoute /></PrivateRoute>} />
        <Route path="/missions" element={<PrivateRoute><Missions /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;