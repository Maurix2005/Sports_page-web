import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  const location = useLocation();

  const navLinks =
    user?.rol === 'ADMIN'
      ? [
          { label: 'Item Management', path: '/admin/items' },
          { label: 'Reception', path: '/admin/reception' },
          { label: 'Users', path: '/admin/users' },
        ]
      : [
          { label: 'Inventory', path: '/inventory' },
          { label: 'My Loans', path: '/my-loans' },
        ];

  return (
    <header className="bg-[#021226] border-b border-[#1E5AA8]/40 px-6 py-4 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <Link
            to={user?.rol === 'ADMIN' ? '/admin/items' : '/inventory'}
            className="text-xl font-bold tracking-wide text-white hover:text-[#EAE2D3] transition"
          >
            Coordinación deportiva
          </Link>
          <span className="px-3 py-0.5 rounded-full bg-[#F05A1A] text-white text-[10px] font-bold uppercase tracking-wider">
            {user?.rol}
          </span>
        </div>

        <nav className="flex items-center flex-wrap justify-center gap-3">
          <div className="inline-flex bg-[#0A4D9C] rounded-full p-0.5 border border-[#1E5AA8]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition duration-200 ${
                    isActive
                      ? 'bg-[#DCE2EA] text-[#0A4D9C] shadow'
                      : 'text-white hover:text-[#DCE2EA]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-1.5 rounded-full border border-[#FB5607] text-[#FB5607] hover:bg-[#FB5607] hover:text-white text-xs font-bold transition duration-200 cursor-pointer"
          >
            Salir
          </button>
        </nav>

      </div>
    </header>
  );
}

export default NavBar;