import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../services/apiClient';

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    deporte: '',
    estadoFisico: 'NUEVO',
    cantidadTotal: '',
  });

  const fetchItems = async () => {
    try {
      const data = await apiFetch('/sports/items');
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSelect = (item) => {
    setEditingId(item.id);
    setFormData({
      codigo: item.codigo || '',
      nombre: item.nombre || '',
      deporte: item.deporte || '',
      estadoFisico: item.estadoFisico || 'BUENO',
      cantidadTotal: item.cantidadTotal ?? item.disponibles ?? '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      codigo: '',
      nombre: '',
      deporte: '',
      estadoFisico: 'NUEVO',
      cantidadTotal: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editingId) {
        await apiFetch(`/sports/items/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            estadoFisico: formData.estadoFisico,
            cantidadTotal: Number(formData.cantidadTotal),
          }),
        });
      } else {
        await apiFetch('/sports/items', {
          method: 'POST',
          body: JSON.stringify({
            codigo: formData.codigo,
            nombre: formData.nombre,
            deporte: formData.deporte,
            estadoFisico: formData.estadoFisico,
            cantidadTotal: Number(formData.cantidadTotal),
          }),
        });
      }

      handleCancelEdit();
      await fetchItems();
    } catch (err) {
      setError(err.message || 'Error al guardar el artículo');
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
          {/* Tarjeta Izquierda: New Item / Edit Item */}
          <div className="lg:col-span-5 figma-card p-6 md:p-8">
            <h2 className="mb-5">
              {editingId ? 'Edit Item:' : 'New Item:'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-xs mb-1">Code:</label>
                <input
                  type="text"
                  name="codigo"
                  required
                  disabled={!!editingId || loading}
                  placeholder="DEP-01"
                  value={formData.codigo}
                  onChange={handleChange}
                  className="figma-input disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-bold text-xs mb-1">Name:</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  disabled={!!editingId || loading}
                  placeholder="Balón Fútbol #5"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="figma-input disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-bold text-xs mb-1">Sport:</label>
                <input
                  type="text"
                  name="deporte"
                  required
                  disabled={!!editingId || loading}
                  placeholder="Fútbol"
                  value={formData.deporte}
                  onChange={handleChange}
                  className="figma-input disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-bold text-xs mb-1">State:</label>
                <select
                  name="estadoFisico"
                  value={formData.estadoFisico}
                  onChange={handleChange}
                  disabled={loading}
                  className="figma-input"
                >
                  <option value="NUEVO">NUEVO</option>
                  <option value="BUENO">BUENO</option>
                  <option value="DESGASTADO">DESGASTADO</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-xs mb-1">Total / items:</label>
                <input
                  type="number"
                  name="cantidadTotal"
                  min="1"
                  required
                  value={formData.cantidadTotal}
                  onChange={handleChange}
                  disabled={loading}
                  className="figma-input"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-1.5 rounded-full border border-[#001326] text-xs font-bold cursor-pointer"
                  >
                    CANCEL
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="figma-btn-orange px-6 py-1.5 text-xs uppercase"
                >
                  {loading ? 'SAVING...' : 'SAVE'}
                </button>
              </div>
            </form>
          </div>

          {/* Tarjeta Derecha: Registered Items */}
          <div className="lg:col-span-7 figma-card p-6 md:p-8">
            <h2 className="mb-4">Registered Items</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-bold border-b border-[#001326]/30">
                    <th className="pb-2 pr-2">Code:</th>
                    <th className="pb-2 px-2">Name:</th>
                    <th className="pb-2 px-2">Status:</th>
                    <th className="pb-2 px-2">Total:</th>
                    <th className="pb-2 pl-2 text-right"></th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2.5 pr-2 border-b border-[#001326]/40">
                        {item.codigo}
                      </td>
                      <td className="py-2.5 px-2 border-b border-[#001326]/40">
                        {item.nombre}
                      </td>
                      <td className="py-2.5 px-2 border-b border-[#001326]/40">
                        {item.estadoFisico}
                      </td>
                      <td className="py-2.5 px-2 border-b border-[#001326]/40">
                        {item.disponibles ?? item.cantidadTotal}
                      </td>
                      <td className="py-2 pl-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleEditSelect(item)}
                          className="figma-btn-orange px-4 py-1 text-[11px] uppercase"
                        >
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-6 text-center opacity-70">
                        No hay artículos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemManagement;