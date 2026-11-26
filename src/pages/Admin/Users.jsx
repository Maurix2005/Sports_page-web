import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/apiClient';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const data = await apiFetch('/users');
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (user) => {
    const newRole = user.rol === 'ADMIN' ? 'USER' : 'ADMIN';
    setLoadingId(user.id);
    setError('');

    try {
      await apiFetch(`/users/${user.id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ rol: newRole }),
      });
      await fetchUsers();
    } catch (err) {
      setError(err.message || 'Error al cambiar el rol');
    } finally {
      setLoadingId(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      u.matricula?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[85vh] bg-[#001326] py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 bg-[#FE3B3B]/20 border border-[#FE3B3B] text-white px-4 py-2 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        <div className="figma-card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2>Users list</h2>
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar por nombre o matrícula..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="figma-input"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold">
                  <th className="pb-3 pr-3">User:</th>
                  <th className="pb-3 px-3">Id:</th>
                  <th className="pb-3 px-3">Email:</th>
                  <th className="pb-3 px-3">Role:</th>
                  <th className="pb-3 pl-3 text-right">Action:</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold">
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="py-2.5 pr-3 border-b border-[#001326]/40">
                      {u.nombre}
                    </td>
                    <td className="py-2.5 px-3 border-b border-[#001326]/40">
                      {u.matricula}
                    </td>
                    <td className="py-2.5 px-3 border-b border-[#001326]/40">
                      {u.email}
                    </td>
                    <td className="py-2.5 px-3 border-b border-[#001326]/40">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${
                          u.rol === 'ADMIN' ? 'bg-[#0050B3]' : 'bg-[#001326]'
                        }`}
                      >
                        {u.rol}
                      </span>
                    </td>
                    <td className="py-2 pl-3 text-right">
                      <button
                        type="button"
                        disabled={loadingId === u.id}
                        onClick={() => handleToggleRole(u)}
                        className={`px-4 py-1 text-[11px] uppercase ${
                          u.rol === 'ADMIN' ? 'figma-btn-red' : 'figma-btn-orange'
                        }`}
                      >
                        {loadingId === u.id
                          ? '...'
                          : u.rol === 'ADMIN'
                          ? 'MAKE USER'
                          : 'MAKE ADMIN'}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-6 text-center opacity-70">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;