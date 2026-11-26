import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/apiClient';
import ItemCard from '../../components/cardItem';
import RequestLoan from '../../components/Request_loan';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [deporte, setDeporte] = useState('');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (deporte.trim()) params.append('deporte', deporte.trim());
      if (soloDisponibles) params.append('disponible', 'true');

      const query = params.toString() ? `?${params.toString()}` : '';
      const data = await apiFetch(`/sports/items${query}`);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Error al cargar el inventario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [deporte, soloDisponibles]);

  return (
    <div className="min-h-[85vh] bg-[#001326] py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-white">Sports Inventory</h1>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={deporte}
              onChange={(e) => setDeporte(e.target.value)}
              className="figma-input w-auto min-w-40"
            >
              <option value="">Todos los deportes</option>
              <option value="Fútbol">Fútbol</option>
              <option value="Básquetbol">Básquetbol</option>
              <option value="Voleibol">Voleibol</option>
              <option value="Atletismo">Atletismo</option>
            </select>

            <label className="flex items-center gap-2 text-xs font-bold text-[#E1DACA] cursor-pointer">
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(e) => setSoloDisponibles(e.target.checked)}
                className="accent-[#FB5607] w-4 h-4"
              />
              Solo disponibles
            </label>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-[#FE3B3B]/20 border border-[#FE3B3B] text-white px-4 py-2 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-[#E1DACA] py-12">Cargando material deportivo...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={() => setSelectedItem(item)}
              />
            ))}
            {items.length === 0 && (
              <p className="col-span-full text-center text-[#E1DACA]/70 py-10">
                No se encontró material con los filtros seleccionados.
              </p>
            )}
          </div>
        )}

        {selectedItem && (
          <RequestLoan
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onSuccess={() => {
              setSelectedItem(null);
              fetchItems();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;