import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

interface Mission {
  id: number;
  titre: string;
  adresseDepart: string;
  adresseArrivee: string;
  status: string;
  createdAt: string;
}

const menuItems = [
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Missions', path: '/missions' },
];

const statusLabel: Record<string, string> = {
  en_attente: 'En attente',
  en_cours: 'En cours',
  terminee: 'Terminée',
  annulee: 'Annulée',
};

const statusColor: Record<string, string> = {
  en_attente: 'bg-amber-50 text-amber-700',
  en_cours: 'bg-orange-50 text-orange-700',
  terminee: 'bg-stone-100 text-stone-600',
  annulee: 'bg-red-50 text-red-600',
};

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

  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-stone-800">Missions</h2>
        <p className="text-sm text-stone-500 mt-1">{missions.length} mission(s) au total</p>
      </div>

      <div className="bg-white border border-stone-200 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Mission</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Départ</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Arrivée</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {missions.map(m => (
              <tr key={m.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3 text-stone-800 font-medium">{m.titre}</td>
                <td className="px-4 py-3 text-stone-600">{m.adresseDepart}</td>
                <td className="px-4 py-3 text-stone-600">{m.adresseArrivee}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[m.status] || 'bg-stone-100 text-stone-600'}`}>
                    {statusLabel[m.status] || m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}