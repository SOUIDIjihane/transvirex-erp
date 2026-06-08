import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Mission {
  id: number;
  titre: string;
  adresseDepart: string;
  adresseArrivee: string;
  status: string;
  createdAt: string;
}

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:4000/missions', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMissions(res.data))
      .catch(() => navigate('/login'));
  }, []);

  const statusColor: Record<string, string> = {
    en_attente: 'bg-yellow-100 text-yellow-800',
    en_cours: 'bg-blue-100 text-blue-800',
    terminee: 'bg-green-100 text-green-800',
    annulee: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Transvirex ERP</h1>
        <button onClick={() => navigate('/dashboard')} className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100">
          Retour
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Missions</h2>
        {missions.length === 0 ? (
          <p className="text-gray-500">Aucune mission pour l'instant.</p>
        ) : (
          <div className="grid gap-4">
            {missions.map(m => (
              <div key={m.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{m.titre}</h3>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${statusColor[m.status]}`}>
                    {m.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">De : {m.adresseDepart}</p>
                <p className="text-gray-500 text-sm">Vers : {m.adresseArrivee}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}