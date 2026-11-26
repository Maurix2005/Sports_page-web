import React, { useState } from 'react';
import { apiFetch } from '../services/apiClient';

const RequestLoan = ({ item, onClose, onSuccess }) => {
  const [cantidad, setCantidad] = useState(1);
  const [canchaOActividad, setCanchaOActividad] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const maxStock = item.disponibles ?? item.cantidadTotal ?? 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiFetch('/sports/loans', {
        method: 'POST',
        body: JSON.stringify({
          itemId: item.id,
          cantidad: Number(cantidad),
          canchaOActividad,
        }),
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'No se pudo solicitar el préstamo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full figma-card p-6 md:p-8">
        <h2 className="mb-2">Request Loan</h2>
        <p className="text-xs font-bold text-[#0050B3] mb-4">
          {item.nombre} ({item.codigo}) — Disponibles: {maxStock}
        </p>

        {error && (
          <div className="mb-4 bg-[#FE3B3B]/20 border border-[#FE3B3B] text-[#FE3B3B] px-3 py-2 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-bold text-xs mb-1">Cantidad:</label>
            <input
              type="number"
              min="1"
              max={maxStock}
              required
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              disabled={loading}
              className="figma-input"
            />
          </div>

          <div>
            <label className="block font-bold text-xs mb-1">
              Cancha o Actividad:
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Cancha 2 / Entrenamiento"
              value={canchaOActividad}
              onChange={(e) => setCanchaOActividad(e.target.value)}
              disabled={loading}
              className="figma-input"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-1.5 rounded-full border border-[#001326] text-xs font-bold cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading || maxStock < 1}
              className="figma-btn-orange px-6 py-1.5 text-xs uppercase"
            >
              {loading ? 'ENVIANDO...' : 'SOLICITAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestLoan;