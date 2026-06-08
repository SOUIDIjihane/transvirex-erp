import React from 'react';
import Layout from '../components/Layout';

const menuItems = [
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Rapports', path: '/rapports' },
];

const kpis = [
  { label: 'Missions ce mois', value: '142', evolution: '+12%', positif: true },
  { label: 'Taux de livraison', value: '94%', evolution: '+2%', positif: true },
  { label: 'Retards', value: '8', evolution: '-3', positif: true },
  { label: "Chiffre d'affaires", value: '48 200 €', evolution: '+8%', positif: true },
];

const hubs = [
  { nom: 'Hub Paris Nord', missions: 42, taux: 96, ca: '18 400 €', chauffeurs: 4 },
  { nom: 'Hub Lyon', missions: 35, taux: 91, ca: '12 600 €', chauffeurs: 2 },
  { nom: 'Hub Marseille', missions: 28, taux: 93, ca: '9 800 €', chauffeurs: 2 },
  { nom: 'Hub Bordeaux', missions: 21, taux: 95, ca: '4 900 €', chauffeurs: 1 },
  { nom: 'Hub Toulouse', missions: 18, taux: 92, ca: '4 200 €', chauffeurs: 1 },
  { nom: 'Hub Lille', missions: 16, taux: 88, ca: '2 500 €', chauffeurs: 1 },
  { nom: 'Hub Paris Sud', missions: 14, taux: 90, ca: '3 800 €', chauffeurs: 1 },
];

const topChauffeurs = [
  { nom: 'Sophie Martin', hub: 'Paris Nord', missions: 18, taux: 100, note: 4.9 },
  { nom: 'Thomas Petit', hub: 'Paris Sud', missions: 14, taux: 100, note: 4.9 },
  { nom: 'Emma Girard', hub: 'Toulouse', missions: 18, taux: 94, note: 4.9 },
  { nom: 'Marc Dubois', hub: 'Paris Nord', missions: 16, taux: 94, note: 4.8 },
  { nom: 'Alexandre Moreau', hub: 'Bordeaux', missions: 21, taux: 95, note: 4.8 },
];

export default function DashboardDirection() {
  const handleExport = () => {
    const contenu = `RAPPORT TRANSVIREX — Juin 2026\n\nKPIs\n${kpis.map(k => `${k.label}: ${k.value} (${k.evolution})`).join('\n')}\n\nPERFORMANCE PAR HUB\n${hubs.map(h => `${h.nom}: ${h.missions} missions, ${h.taux}% livraison, ${h.ca}`).join('\n')}`;
    const blob = new Blob([contenu], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rapport-transvirex-juin-2026.txt';
    a.click();
  };

  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-stone-800">Tableau de bord Direction</h2>
          <p className="text-sm text-stone-500 mt-1">Vue globale — Juin 2026</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-orange-700 text-white text-sm px-4 py-2 rounded hover:bg-orange-800 transition-colors"
        >
          Exporter rapport
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white border border-stone-200 rounded p-4">
            <p className="text-xs text-stone-500 uppercase tracking-wide">{k.label}</p>
            <p className="text-2xl font-bold text-stone-800 mt-1">{k.value}</p>
            <p className={`text-xs font-medium mt-1 ${k.positif ? 'text-orange-700' : 'text-red-600'}`}>
              {k.evolution} vs mois dernier
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-stone-200 rounded overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-100">
            <h3 className="text-sm font-semibold text-stone-700">Performance par hub</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Hub</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Missions</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Taux</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">CA</th>
              </tr>
            </thead>
            <tbody>
              {hubs.map((h, i) => (
                <tr key={i} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 text-stone-800 font-medium">{h.nom}</td>
                  <td className="px-4 py-3 text-stone-600">{h.missions}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-stone-100 rounded-full h-1.5">
                        <div className="bg-orange-600 h-1.5 rounded-full" style={{ width: `${h.taux}%` }} />
                      </div>
                      <span className="text-stone-600 text-xs">{h.taux}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{h.ca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-stone-200 rounded overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-100">
            <h3 className="text-sm font-semibold text-stone-700">Top chauffeurs</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Chauffeur</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Hub</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Missions</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {topChauffeurs.map((c, i) => (
                <tr key={i} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 text-stone-800 font-medium">{c.nom}</td>
                  <td className="px-4 py-3 text-stone-500 text-xs">{c.hub}</td>
                  <td className="px-4 py-3 text-stone-600">{c.missions}</td>
                  <td className="px-4 py-3 text-orange-700 font-medium">{c.note}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}