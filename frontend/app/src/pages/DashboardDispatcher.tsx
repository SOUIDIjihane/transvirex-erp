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

export default function DashboardDispatcher() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ titre: '', adresseDepart: '', adresseArrivee: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchMissions = () => {
    axios.get('http://localhost:4000/missions', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMissions(res.data))
      .catch(() => navigate('/login'));
  };

  useEffect(() => { fetchMissions(); }, []);

  const handleCreate = async () => {
    if (!form.titre || !form.adresseDepart || !form.adresseArrivee) return;
    await axios.post('http://localhost:4000/missions', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ titre: '', adresseDepart: '', adresseArrivee: '' });
    setShowForm(false);
    fetchMissions();
  };

  const enAttente = missions.filter(m => m.status === 'en_attente').length;
  const enCours = missions.filter(m => m.status === 'en_cours').length;
  const terminees = missions.filter(m => m.status === 'terminee').length;

  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-stone-800">Supervision des missions</h2>
          <p className="text-sm text-stone-500 mt-1">{missions.length} mission(s) au total</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-700 text-white text-sm px-4 py-2 rounded hover:bg-orange-800 transition-colors"
        >
          Nouvelle mission
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-stone-200 rounded p-4">
          <p className="text-xs text-stone-500 uppercase tracking-wide">En attente</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{enAttente}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4">
          <p className="text-xs text-stone-500 uppercase tracking-wide">En cours</p>
          <p className="text-2xl font-bold text-orange-700 mt-1">{enCours}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4">
          <p className="text-xs text-stone-500 uppercase tracking-wide">Terminées</p>
          <p className="text-2xl font-bold text-stone-600 mt-1">{terminees}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-stone-200 rounded p-6 mb-6">
          <h3 className="text-sm font-semibold text-stone-800 mb-4">Créer une mission</h3>
          <div className="grid grid-cols-1 gap-3">
            <input
              placeholder="Titre de la mission"
              value={form.titre}
              onChange={e => setForm({ ...form, titre: e.target.value })}
              className="border border-stone-300 rounded px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-orange-500"
            />
            <input
              placeholder="Adresse de départ"
              value={form.adresseDepart}
              onChange={e => setForm({ ...form, adresseDepart: e.target.value })}
              className="border border-stone-300 rounded px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-orange-500"
            />
            <input
              placeholder="Adresse d'arrivée"
              value={form.adresseArrivee}
              onChange={e => setForm({ ...form, adresseArrivee: e.target.value })}
              className="border border-stone-300 rounded px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-orange-500"
            />
            <div className="flex gap-2">
              <button onClick={handleCreate} className="bg-orange-700 text-white text-sm px-4 py-2 rounded hover:bg-orange-800">
                Créer
              </button>
              <button onClick={() => setShowForm(false)} className="bg-stone-100 text-stone-700 text-sm px-4 py-2 rounded hover:bg-stone-200">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

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