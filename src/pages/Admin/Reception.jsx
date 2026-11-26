import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/apiClient';

const Reception = () => {
  const [activeLoans, setActiveLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [estadoDevolucion, setEstadoDevolucion] = useState('BUENO');
  const [notas, setNotas] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchActiveLoans = async () => {
    try {
      const data = await apiFetch('/sports/loans');
      const onlyActives = Array.isArray(data)
        ? data.filter((loan) => loan.estatus === 'ACTIVO')
        : [];
      setActiveLoans(onlyActives);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchActiveLoans();
  }, []);

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLoan) {
      setError('Selecciona primero un préstamo de la lista (botón RECEIVE).');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const loanId = selectedLoan.loanId || selectedLoan.id;
      await apiFetch(`/sports/loans/${loanId}/return`, {
        method: 'PATCH',
        body: JSON.stringify({
          estadoDevolucion,
          notas,
        }),
      });

      setSelectedLoan(null);
      setEstadoDevolucion('BUENO');
      setNotas('');
      await fetchActiveLoans();
    } catch (err) {
      setError(err.message || 'Error al registrar la devolución');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#001326] py-8 px-6">
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="mb-4 bg-[#FE3B3B]/20 border border-[#FE3B3B] text-white px-4 py-2 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tarjeta Izquierda: Active Loans */}
          <div className="lg:col-span-7 figma-card p-6 md:p-8">
            <h2 className="mb-4">Active Loans:</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-bold">
                    <th className="pb-2 pr-2">Item:</th>
                    <th className="pb-2 px-2">Cant:</th>
                    <th className="pb-2 px-2">User:</th>
                    <th className="pb-2 px-2">ACT:</th>
                    <th className="pb-2 pl-2 text-right"></th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {activeLoans.map((loan) => {
                    const id = loan.loanId || loan.id;
                    const isSelected = (selectedLoan?.loanId || selectedLoan?.id) === id;
                    return (
                      <tr key={id} className={isSelected ? 'bg-[#FB5607]/20' : ''}>
                        <td className="py-2.5 pr-2 border-b border-[#001326]/40">
                          {loan.item}
                        </td>
                        <td className="py-2.5 px-2 border-b border-[#001326]/40">
                          {loan.cantidad}
                        </td>
                        <td className="py-2.5 px-2 border-b border-[#001326]/40">
                          {loan.usuario}
                        </td>
                        <td className="py-2.5 px-2 border-b border-[#001326]/40">
                          {loan.canchaOActividad || '-'}
                        </td>
                        <td className="py-2 pl-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedLoan(loan)}
                            className="figma-btn-orange px-4 py-1 text-[11px] uppercase"
                          >
                            RECEIVE
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {activeLoans.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-6 text-center opacity-70">
                        No hay préstamos activos pendientes de recepción.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tarjeta Derecha: Receive Item */}
          <div className="lg:col-span-5 figma-card p-6 md:p-8">
            <h2 className="mb-2">Receive Item:</h2>
            <p className="text-xs font-bold text-[#0050B3] mb-4">
              {selectedLoan
                ? `Recibiendo: ${selectedLoan.item} (${selectedLoan.usuario})`
                : 'Selecciona un préstamo con el botón RECEIVE'}
            </p>

            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-xs mb-1">State:</label>
                <select
                  value={estadoDevolucion}
                  onChange={(e) => setEstadoDevolucion(e.target.value)}
                  disabled={!selectedLoan || loading}
                  className="figma-input"
                >
                  <option value="BUENO">BUENO</option>
                  <option value="DANADO">DAÑADO</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-xs mb-1">Observations:</label>
                <textarea
                  rows="4"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  disabled={!selectedLoan || loading}
                  placeholder="Estado en el que se entrega el material..."
                  className="w-full px-3 py-2 rounded-2xl bg-[#DCE2EA] border border-[#0050B3] text-[#001326] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FB5607]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!selectedLoan || loading}
                  className="figma-btn-orange px-6 py-1.5 text-xs uppercase"
                >
                  {loading ? 'SAVING...' : 'SAVE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reception;