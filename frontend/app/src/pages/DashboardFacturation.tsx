import React from 'react';
import Layout from '../components/Layout';

const menuItems = [
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Factures', path: '/factures' },
];

const factures = [
  { id: 'FAC-001', client: 'EcomExpress', montant: 1250, statut: 'Payée', date: '01/06/2026' },
  { id: 'FAC-002', client: 'FreshFood', montant: 890, statut: 'En attente', date: '03/06/2026' },
  { id: 'FAC-003', client: 'TechParts', montant: 2100, statut: 'En retard', date: '28/05/2026' },
  { id: 'FAC-004', client: 'MediCare', montant: 640, statut: 'Payée', date: '05/06/2026' },
  { id: 'FAC-005', client: 'AutoParts', montant: 1780, statut: 'En attente', date: '06/06/2026' },
];

const statutColor: Record<string, string> = {
  'Payée': 'bg-stone-100 text-stone-600',
  'En attente': 'bg-amber-50 text-amber-700',
  'En retard': 'bg-red-50 text-red-600',
};

export default function DashboardFacturation() {
  const total = factures.reduce((s, f) => s + f.montant, 0);
  const paye = factures.filter(f => f.statut === 'Payée').reduce((s, f) => s + f.montant, 0);
  const enAttente = factures.filter(f => f.statut !== 'Payée').reduce((s, f) => s + f.montant, 0);

  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-stone-800">Facturation</h2>
          <p className="text-sm text-stone-500 mt-1">{factures.length} factures ce mois</p>
        </div>
        <button className="bg-orange-700 text-white text-sm px-4 py-2 rounded hover:bg-orange-800 transition-colors">
          Nouvelle facture
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-stone-200 rounded p-4">
          <p className="text-xs text-stone-500 uppercase tracking-wide">Total facturé</p>
          <p className="text-2xl font-bold text-stone-800 mt-1">{total.toLocaleString()} €</p>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4">
          <p className="text-xs text-stone-500 uppercase tracking-wide">Encaissé</p>
          <p className="text-2xl font-bold text-orange-700 mt-1">{paye.toLocaleString()} €</p>
        </div>
        <div className="bg-white border border-stone-200 rounded p-4">
          <p className="text-xs text-stone-500 uppercase tracking-wide">En attente</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{enAttente.toLocaleString()} €</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              <th className="text-left px-4 py-3 text-stone-500 font-medium">N° Facture</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Client</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Montant</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Date</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Statut</th>
              <th className="text-left px-4 py-3 text-stone-500 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {factures.map(f => (
              <tr key={f.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="px-4 py-3 text-stone-700 font-medium">{f.id}</td>
                <td className="px-4 py-3 text-stone-600">{f.client}</td>
                <td className="px-4 py-3 text-stone-800">{f.montant.toLocaleString()} €</td>
                <td className="px-4 py-3 text-stone-500">{f.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statutColor[f.statut]}`}>
                    {f.statut}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-orange-700 hover:underline">Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}