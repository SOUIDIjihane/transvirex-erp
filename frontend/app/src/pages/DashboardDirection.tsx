import React from 'react';
import Layout from '../components/Layout';

const menuItems = [
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Rapports', path: '/rapports' },
];

const kpis = [
  { label: 'Missions ce mois', value: '142', evolution: '+12%' },
  { label: 'Taux de livraison', value: '94%', evolution: '+2%' },
  { label: 'Retards', value: '8', evolution: '-3' },
  { label: "Chiffre d'affaires", value: '48 200 €', evolution: '+8%' },
];

const hubs = [
  { nom: 'Paris Nord', missions: 42, taux: 96, ca: '18 400 €' },
  { nom: 'Lyon', missions: 35, taux: 91, ca: '12 600 €' },
  { nom: 'Marseille', missions: 28, taux: 93, ca: '9 800 €' },
  { nom: 'Bordeaux', missions: 21, taux: 95, ca: '4 900 €' },
  { nom: 'Lille', missions: 16, taux: 88, ca: '2 500 €' },
];

export default function DashboardDirection() {
  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-stone-800">Tableau de bord Direction</h2>
          <p className="text-sm text-stone-500 mt-1">Vue globale — Juin 2026</p>
        </div>
        <button className="bg-orange-700 text-white text-sm px-4 py-2 rounded hover:bg-orange-800 transition-colors">
          Exporter rapport
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white border border-stone-200 rounded p-4">
            <p className="text-xs text-stone-500 uppercase tracking-wide">{k.label}</p>
            <p className="text-2xl font-bold text-stone-800 mt-1">{k.value}</p>
            <p className="text-xs text-orange-700 font-medium mt-1">{k.evolution} vs mois dernier</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-stone-100">
          <h3 className="text-sm font-semibold text-stone-700">Performance par hub</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Hub</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Missions</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Taux livraison</th>
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
                    <div className="w-20 bg-stone-100 rounded-full h-1.5">
                      <div
                        className="bg-orange-600 h-1.5 rounded-full"
                        style={{ width: `${h.taux}%` }}
                      />
                    </div>
                    <span className="text-stone-600">{h.taux}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone-600">{h.ca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}