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
}

const menuItems = [
  { label: 'Ma tournée', path: '/dashboard' },
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

const nextStatus: Record<string, string> = {
  en_attente: 'en_cours',
  en_cours: 'terminee',
};

const nextStatusLabel: Record<string, string> = {
  en_attente: 'Démarrer',
  en_cours: 'Terminer',
};

export default function DashboardChauffeur() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [incident, setIncident] = useState<number | null>(null);
  const [incidentText, setIncidentText] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchMissions = () => {
    axios.get('http://localhost:4000/missions', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMissions(res.data))
      .catch(() => navigate('/login'));
  };

  useEffect(() => { fetchMissions(); }, []);

  const handleStatusChange = async (id: number, status: string) => {
    await axios.patch(`http://localhost:4000/missions/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchMissions();
  };

  const handleIncident = async (id: number) => {
    if (!incidentText.trim()) return;
    alert(`Incident signalé pour la mission #${id} : ${incidentText}`);
    setIncident(null);
    setIncidentText('');
  };

  const missionActives = missions.filter(m => m.status !== 'terminee' && m.status !== 'annulee');
  const missionTerminees = missions.filter(m => m.status === 'terminee');

  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-stone-800">Ma tournée du jour</h2>
        <p className="text-sm text-stone-500 mt-1">
          {missionActives.length} mission(s) active(s) — {missionTerminees.length} terminée(s)
        </p>
      </div>

      {missionActives.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded p-8 text-center text-stone-400 text-sm">
          Aucune mission active pour aujourd'hui.
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
            <h3 className="text-sm font-semibold text-stone-700">Missions actives</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left px-4 py-3 text-stone-500 font-medium">#</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Mission</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Départ</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Arrivée</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Statut</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {missionActives.map((m, i) => (
                <React.Fragment key={m.id}>
                  <tr className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="px-4 py-3 text-stone-400">{i + 1}</td>
                    <td className="px-4 py-3 text-stone-800 font-medium">{m.titre}</td>
                    <td className="px-4 py-3 text-stone-600">{m.adresseDepart}</td>
                    <td className="px-4 py-3 text-stone-600">{m.adresseArrivee}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[m.status]}`}>
                        {statusLabel[m.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {nextStatus[m.status] && (
                        <button
                          onClick={() => handleStatusChange(m.id, nextStatus[m.status])}
                          className="text-xs bg-orange-700 text-white px-3 py-1 rounded hover:bg-orange-800"
                        >
                          {nextStatusLabel[m.status]}
                        </button>
                      )}
                      <button
                        onClick={() => setIncident(incident === m.id ? null : m.id)}
                        className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 border border-red-200"
                      >
                        Incident
                      </button>
                    </td>
                  </tr>
                  {incident === m.id && (
                    <tr className="bg-red-50 border-b border-stone-100">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Décrivez l'incident..."
                            value={incidentText}
                            onChange={e => setIncidentText(e.target.value)}
                            className="flex-1 border border-red-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-red-400"
                          />
                          <button
                            onClick={() => handleIncident(m.id)}
                            className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
                          >
                            Signaler
                          </button>
                          <button
                            onClick={() => setIncident(null)}
                            className="text-xs text-stone-500 hover:text-stone-700"
                          >
                            Annuler
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {missionTerminees.length > 0 && (
        <div className="bg-white border border-stone-200 rounded overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
            <h3 className="text-sm font-semibold text-stone-500">Missions terminées ({missionTerminees.length})</h3>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {missionTerminees.map(m => (
                <tr key={m.id} className="border-b border-stone-100 opacity-60">
                  <td className="px-4 py-3 text-stone-600">{m.titre}</td>
                  <td className="px-4 py-3 text-stone-400">{m.adresseArrivee}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-stone-100 text-stone-500">
                      Terminée
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}