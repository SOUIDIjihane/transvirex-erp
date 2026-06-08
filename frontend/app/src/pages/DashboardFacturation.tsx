import React, { useState } from 'react';
import Layout from '../components/Layout';

const menuItems = [
  { label: 'Tableau de bord', path: '/dashboard' },
  { label: 'Factures', path: '/factures' },
];

interface Facture {
  id: string;
  client: string;
  montant: number;
  statut: string;
  date: string;
  echeance: string;
  livraisons: number;
}

const facturesInitiales: Facture[] = [
  { id: 'INV-2026-001', client: 'EcomExpress SAS', montant: 3450, statut: 'Payée', date: '01/05/2026', echeance: '15/05/2026', livraisons: 45 },
  { id: 'INV-2026-002', client: 'FreshFood Distribution', montant: 2180, statut: 'Payée', date: '01/05/2026', echeance: '15/05/2026', livraisons: 28 },
  { id: 'INV-2026-003', client: 'TechParts Solutions', montant: 4560, statut: 'En attente', date: '01/05/2026', echeance: '15/05/2026', livraisons: 35 },
  { id: 'INV-2026-004', client: 'MediSupply France', montant: 1890, statut: 'Payée', date: '01/05/2026', echeance: '15/05/2026', livraisons: 22 },
  { id: 'INV-2026-005', client: 'FashionHub Online', montant: 2940, statut: 'En attente', date: '01/05/2026', echeance: '15/05/2026', livraisons: 38 },
  { id: 'INV-2026-006', client: 'AutoPièces Direct', montant: 3210, statut: 'En retard', date: '01/05/2026', echeance: '15/05/2026', livraisons: 41 },
  { id: 'INV-2026-007', client: 'BioFarm Logistics', montant: 1560, statut: 'Payée', date: '01/05/2026', echeance: '15/05/2026', livraisons: 19 },
  { id: 'INV-2026-008', client: 'UrbanMarket', montant: 2780, statut: 'En attente', date: '01/05/2026', echeance: '15/05/2026', livraisons: 33 },
  { id: 'INV-2026-009', client: 'ProOffice Supplies', montant: 1920, statut: 'Payée', date: '01/05/2026', echeance: '15/05/2026', livraisons: 24 },
  { id: 'INV-2026-010', client: 'PharmaCare Express', montant: 2340, statut: 'En attente', date: '01/05/2026', echeance: '15/05/2026', livraisons: 29 },
];

const statutColor: Record<string, string> = {
  'Payée': 'bg-stone-100 text-stone-600',
  'En attente': 'bg-amber-50 text-amber-700',
  'En retard': 'bg-red-50 text-red-600',
};

export default function DashboardFacturation() {
  const [factures, setFactures] = useState<Facture[]>(facturesInitiales);
  const [selected, setSelected] = useState<Facture | null>(null);
  const [filtre, setFiltre] = useState('Tous');
  const [showForm, setShowForm] = useState(false);
  const [newForm, setNewForm] = useState({ client: '', montant: '', date: '', echeance: '' });

  const total = factures.reduce((s, f) => s + f.montant, 0);
  const paye = factures.filter(f => f.statut === 'Payée').reduce((s, f) => s + f.montant, 0);
  const enAttente = factures.filter(f => f.statut !== 'Payée').reduce((s, f) => s + f.montant, 0);
  const enRetard = factures.filter(f => f.statut === 'En retard').length;

  const facturesFiltrees = filtre === 'Tous'
    ? factures
    : factures.filter(f => f.statut === filtre);

  const handleStatut = (id: string, statut: string) => {
    setFactures(factures.map(f => f.id === id ? { ...f, statut } : f));
    if (selected?.id === id) setSelected({ ...selected, statut });
  };

  const handleCreate = () => {
    if (!newForm.client || !newForm.montant) return;
    const newFacture: Facture = {
      id: `INV-2026-0${String(factures.length + 1).padStart(2, '0')}`,
      client: newForm.client,
      montant: parseInt(newForm.montant),
      statut: 'En attente',
      date: newForm.date || new Date().toLocaleDateString('fr-FR'),
      echeance: newForm.echeance || '',
      livraisons: 0,
    };
    setFactures([...factures, newFacture]);
    setNewForm({ client: '', montant: '', date: '', echeance: '' });
    setShowForm(false);
  };

  return (
    <Layout menuItems={menuItems}>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-stone-800">Facturation</h2>
          <p className="text-sm text-stone-500 mt-1">{factures.length} factures — {enRetard} en retard</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-700 text-white text-sm px-4 py-2 rounded hover:bg-orange-800 transition-colors"
        >
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
          <p className="text-xs text-stone-500 uppercase tracking-wide">En attente / Retard</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{enAttente.toLocaleString()} €</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-stone-200 rounded p-6 mb-6">
          <h3 className="text-sm font-semibold text-stone-800 mb-4">Nouvelle facture</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Client"
              value={newForm.client}
              onChange={e => setNewForm({ ...newForm, client: e.target.value })}
              className="border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
            <input
              placeholder="Montant (€)"
              type="number"
              value={newForm.montant}
              onChange={e => setNewForm({ ...newForm, montant: e.target.value })}
              className="border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
            <input
              placeholder="Date d'émission"
              type="date"
              value={newForm.date}
              onChange={e => setNewForm({ ...newForm, date: e.target.value })}
              className="border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
            <input
              placeholder="Date d'échéance"
              type="date"
              value={newForm.echeance}
              onChange={e => setNewForm({ ...newForm, echeance: e.target.value })}
              className="border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleCreate} className="bg-orange-700 text-white text-sm px-4 py-2 rounded hover:bg-orange-800">
              Créer
            </button>
            <button onClick={() => setShowForm(false)} className="bg-stone-100 text-stone-700 text-sm px-4 py-2 rounded hover:bg-stone-200">
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {['Tous', 'Payée', 'En attente', 'En retard'].map(f => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`text-xs px-3 py-1.5 rounded border transition-colors ${
              filtre === f
                ? 'bg-orange-700 text-white border-orange-700'
                : 'bg-white text-stone-600 border-stone-200 hover:border-orange-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className={`bg-white border border-stone-200 rounded overflow-hidden ${selected ? 'flex-1' : 'w-full'}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left px-4 py-3 text-stone-500 font-medium">N° Facture</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Client</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Montant</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Statut</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {facturesFiltrees.map(f => (
                <tr
                  key={f.id}
                  className={`border-b border-stone-100 hover:bg-stone-50 cursor-pointer ${selected?.id === f.id ? 'bg-orange-50' : ''}`}
                  onClick={() => setSelected(selected?.id === f.id ? null : f)}
                >
                  <td className="px-4 py-3 text-stone-700 font-medium">{f.id}</td>
                  <td className="px-4 py-3 text-stone-600">{f.client}</td>
                  <td className="px-4 py-3 text-stone-800">{f.montant.toLocaleString()} €</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statutColor[f.statut]}`}>
                      {f.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    {f.statut !== 'Payée' && (
                      <button
                        onClick={() => handleStatut(f.id, 'Payée')}
                        className="text-xs text-orange-700 hover:underline"
                      >
                        Marquer payée
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="w-72 bg-white border border-stone-200 rounded p-5 shrink-0">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-semibold text-stone-800">Détail facture</h3>
              <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-600 text-xs">
                Fermer
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Référence</p>
                <p className="text-stone-800 font-medium">{selected.id}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Client</p>
                <p className="text-stone-800">{selected.client}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Montant</p>
                <p className="text-stone-800 font-bold text-lg">{selected.montant.toLocaleString()} €</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Livraisons</p>
                <p className="text-stone-800">{selected.livraisons} livraisons</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Date émission</p>
                <p className="text-stone-800">{selected.date}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Échéance</p>
                <p className="text-stone-800">{selected.echeance}</p>
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide">Statut</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statutColor[selected.statut]}`}>
                  {selected.statut}
                </span>
              </div>
              {selected.statut !== 'Payée' && (
                <button
                  onClick={() => handleStatut(selected.id, 'Payée')}
                  className="w-full bg-orange-700 text-white text-sm py-2 rounded hover:bg-orange-800 mt-2"
                >
                  Marquer comme payée
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}