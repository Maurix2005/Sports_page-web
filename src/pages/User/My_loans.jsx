import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/apiClient';

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [tab, setTab] = useState('ACTIVO');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyLoans = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/sports/loans');
      setLoans(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Error al cargar tus préstamos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLoans();
  }, []);

  const filteredLoans = loans.filter((loan) =>
    tab === 'ACTIVO' ? loan.estatus === 'ACTIVO' : loan.estatus !== 'ACTIVO'
  );

  return (
    <div className="min-h-[85vh] bg-[#001326] py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-white">My Loans</h1>

          <div className="inline-flex bg-[#0050B3] rounded-full p-1">
            <button
              type="button"
              onClick={() => setTab('ACTIVO')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                tab === 'ACTIVO'
                  ? 'bg-[#E1DACA] text-[#001326]'
                  : 'text-white'
              }`}
            >
              Actives
            </button>
            <button
              type="button"
              onClick={() => setTab('HISTORIAL')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                tab === 'HISTORIAL'
                  ? 'bg-[#E1DACA] text-[#001326]'
                  : 'text-white'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-[#FE3B3B]/20 border border-[#FE3B3B] text-white px-4 py-2 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        <div className="figma-card p-6 md:p-8">
          {loading ? (
            <p className="text-center py-8 font-bold">Cargando préstamos...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-bold border-b border-[#001326]/30">
                    <th className="pb-3 pr-3">Item:</th>
                    <th className="pb-3 px-3">Cant:</th>
                    <th className="pb-3 px-3">Actividad:</th>
                    <th className="pb-3 px-3">Estatus:</th>
                    <th className="pb-3 pl-3">Notas:</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {filteredLoans.map((loan) => (
                    <tr key={loan.loanId || loan.id}>
                      <td className="py-3 pr-3 border-b border-[#001326]/30">
                        {loan.item}
                      </td>
                      <td className="py-3 px-3 border-b border-[#001326]/30">
                        {loan.cantidad}
                      </td>
                      <td className="py-3 px-3 border-b border-[#001326]/30">
                        {loan.canchaOActividad || '-'}
                      </td>
                      <td className="py-3 px-3 border-b border-[#001326]/30">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white ${
                            loan.estatus === 'ACTIVO'
                              ? 'bg-[#FB5607]'
                              : 'bg-[#0050B3]'
                          }`}
                        >
                          {loan.estatus}
                        </span>
                      </td>
                      <td className="py-3 pl-3 border-b border-[#001326]/30">
                        {loan.notas || '-'}
                      </td>
                    </tr>
                  ))}
                  {filteredLoans.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center opacity-70">
                        No tienes préstamos en esta sección.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLoans;