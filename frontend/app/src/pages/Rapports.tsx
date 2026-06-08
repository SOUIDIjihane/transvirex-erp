import React, { useState } from 'react';
import Layout from '../components/Layout';

const menuItems = [
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Rapports', path: '/rapports' },
];

const rapports = [
  { id: 1, titre: 'Rapport mensuel — Mai 2026', type: 'Mensuel', date: '01/06/2026', missions: 142, taux: 94, ca: '48 200 €' },
  { id: 2, titre: 'Rapport mensuel — Avril 2026', type: 'Mensuel', date: '01/05/2026', missions: 138, taux: 95, ca: '46 800 €' },
  { id: 3, titre: 'Rapport mensuel — Mars 2026', type: 'Mensuel', date: '01/04/2026', missions: 125, taux: 93, ca: '42 300 €' },
  { id: 4, titre: 'Rapport mensuel — Février 2026', type: 'Mensuel', date: '01/03/2026', missions: 118, taux: 91, ca: '39 800 €' },
  { id: 5, titre: 'Rapport Hub Paris Nord — T1 2026', type: 'Hub', date: '01/04/2026', missions: 156, taux: 96, ca: '52 400 €' },
  { id: 6, titre: 'Rapport Hub Lyon — T1 2026', type: 'Hub', date: '01/04/2026', missions: 98, taux: 91, ca: '33 200 €' },
];

const incidents = [
  { id: 'INC-2026-001', mission: 'EcomExpress - Paris 11ème', type: 'Retard livraison', gravite: 'Faible', statut: 'Résolu', date: '02/06/2026' },
  { id: 'INC-2026-002', mission: 'TechParts - Toulouse (Fret)', type: 'Colis endommagé', gravite: 'Moyenne', statut: 'En cours', date: '05/06/2026' },
  { id: 'INC-2026-003', mission: 'AutoPièces - Bordeaux', type: 'Adresse incorrecte', gravite: 'Moyenne', statut: 'Résolu', date: '06/06/2026' },
  { id: 'INC-2026-004', mission: 'FashionHub - Paris 9ème', type: 'Annulation client', gravite: 'Faible', statut: 'Résolu', date: '03/06/2026' },
  { id: 'INC-2026-005', mission: 'BioFarm - Lille (Fret)', type: 'Panne véhicule', gravite: 'Critique', statut: 'En cours', date: '06/06/2026' },
];

const graviteColor: Record<string, string> = {
  'Faible': 'bg-stone-100 text-stone-600',
  'Moyenne': 'bg-amber-50 text-amber-700',
  'Critique': 'bg-red-50 text-red-600',
};

const statutColor: Record<string, string> = {
  'Résolu': 'bg-stone-100 text-stone-600',
  'En cours': 'bg-orange-50 text-orange-700',
};

export default function Rapports() {
  const [onglet, setOnglet] = useState<'rapports' | 'incidents'>('rapports');

  const handleExport = (r: typeof rapports[0]) => {
    const contenu = `${r.titre}\nDate : ${r.date}\nMissions : ${r.missions}\nTaux livraison : ${r.taux}%\nCA : ${r.ca}`;
    const blob = new Blob([contenu], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${r.titre.replace(/ /g, '-')}.txt`;
    a.click();
  };

  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-stone-800">Rapports</h2>
        <p className="text-sm text-stone-500 mt-1">Historique des rapports et incidents</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setOnglet('rapports')}
          className={`text-sm px-4 py-2 rounded border transition-colors ${
            onglet === 'rapports'
              ? 'bg-orange-700 text-white border-orange-700'
              : 'bg-white text-stone-600 border-stone-200 hover:border-orange-300'
          }`}
        >
          Rapports ({rapports.length})
        </button>
        <button
          onClick={() => setOnglet('incidents')}
          className={`text-sm px-4 py-2 rounded border transition-colors ${
            onglet === 'incidents'
              ? 'bg-orange-700 text-white border-orange-700'
              : 'bg-white text-stone-600 border-stone-200 hover:border-orange-300'
          }`}
        >
          Incidents ({incidents.length})
        </button>
      </div>

      {onglet === 'rapports' && (
        <div className="bg-white border border-stone-200 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Rapport</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Type</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Date</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Missions</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Taux</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">CA</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Export</th>
              </tr>
            </thead>
            <tbody>
              {rapports.map(r => (
                <tr key={r.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 text-stone-800 font-medium">{r.titre}</td>
                  <td className="px-4 py-3 text-stone-500 text-xs">{r.type}</td>
                  <td className="px-4 py-3 text-stone-500">{r.date}</td>
                  <td className="px-4 py-3 text-stone-600">{r.missions}</td>
                  <td className="px-4 py-3 text-stone-600">{r.taux}%</td>
                  <td className="px-4 py-3 text-stone-600">{r.ca}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleExport(r)}
                      className="text-xs text-orange-700 hover:underline"
                    >
                      Télécharger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {onglet === 'incidents' && (
        <div className="bg-white border border-stone-200 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-4 py-3 text-stone-500 font-medium">N° Incident</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Mission</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Type</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Gravité</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Date</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(inc => (
                <tr key={inc.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 text-stone-700 font-medium">{inc.id}</td>
                  <td className="px-4 py-3 text-stone-600">{inc.mission}</td>
                  <td className="px-4 py-3 text-stone-600">{inc.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${graviteColor[inc.gravite]}`}>
                      {inc.gravite}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-500">{inc.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statutColor[inc.statut]}`}>
                      {inc.statut}
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