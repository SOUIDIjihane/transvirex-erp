import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
}

interface LayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
}

export default function Layout({ children, menuItems }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-stone-50 font-sans">

      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-stone-200 flex flex-col">
        <div className="px-6 py-5 border-b border-stone-200">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Transvirex</p>
          <p className="text-base font-bold text-stone-800 mt-0.5">ERP Logistique</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                location.pathname === item.path
                  ? 'bg-orange-50 text-orange-700 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-stone-200">
          <p className="text-xs text-stone-500">{user.prenom} {user.nom}</p>
          <p className="text-xs text-stone-400 capitalize mb-2">{user.role}</p>
          <button
            onClick={handleLogout}
            className="text-xs text-stone-500 hover:text-red-600 transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-stone-200 px-8 py-4">
          <h1 className="text-sm font-medium text-stone-500">
            {menuItems.find(m => m.path === location.pathname)?.label || 'Tableau de bord'}
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {children}
        </main>
      </div>

    </div>
  );
}