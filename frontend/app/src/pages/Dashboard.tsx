import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Transvirex ERP</h1>
        <div className="flex items-center gap-4">
          <span>{user.prenom} {user.nom} — {user.role}</span>
          <button onClick={handleLogout} className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100">
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md" onClick={() => navigate('/missions')}>
            <h3 className="text-lg font-semibold text-gray-700">Missions</h3>
            <p className="text-gray-500 mt-2">Gérer les livraisons</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Chauffeurs</h3>
            <p className="text-gray-500 mt-2">Gérer les chauffeurs</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Facturation</h3>
            <p className="text-gray-500 mt-2">Gérer les factures</p>
          </div>
        </div>
      </div>
    </div>
  );
}
