import React, { useState } from 'react';

export default function RequestLoan({ 
  item = { name: 'Balon Futbol', condition: 'Good', available: 8 }, 
  onCancel, 
  onConfirm 
}) {
  const [quantity, setQuantity] = useState('');
  const [activity, setActivity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const qtyNumber = Number(quantity);

    if (!qtyNumber || qtyNumber <= 0) {
      setError('Ingresa una cantidad válida mayor a 0.');
      return;
    }

    if (qtyNumber > item.available) {
      setError(`Solo hay ${item.available} piezas disponibles.`);
      return;
    }

    if (!activity.trim()) {
      setError('Especifica la actividad para el préstamo.');
      return;
    }

    // Enviar datos del préstamo confirmado
    if (onConfirm) {
      onConfirm({
        item: item.name,
        quantity: qtyNumber,
        activity: activity.trim(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#021226] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Título Superior */}
      <h1 className="text-white text-2xl font-bold mb-6 tracking-wide">
        Request Loan
      </h1>

      {/* Tarjeta Principal */}
      <div className="max-w-sm w-full bg-[#EAE2D3] border-[3px] border-[#F05A1A] rounded-3xl p-8 shadow-2xl">
        
        {/* Encabezado del Artículo: Nombre + Etiqueta de Estado */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#021226] font-extrabold text-base">
            {item.name}
          </h2>
          <span className="px-4 py-0.5 rounded-full border-[1.5px] border-[#021226] text-[#021226] text-xs font-bold">
            {item.condition}
          </span>
        </div>

        {/* Disponibilidad */}
        <p className="text-[#1E5AA8] text-xs font-semibold mb-6">
          Available: {item.available} pzas
        </p>

        {/* Mensaje de error si excede stock o faltan datos */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-500 text-red-700 px-3 py-1.5 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo Quantity (Input pequeño tipo píldora) */}
          <div>
            <label className="block text-[#021226] font-semibold text-xs mb-1.5">
              Quantity:
            </label>
            <input
              type="number"
              min="1"
              max={item.available}
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-24 px-3 py-1 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
            />
          </div>

          {/* Campo Activity (Textarea/Caja rectangular redondeada) */}
          <div>
            <label className="block text-[#021226] font-semibold text-xs mb-1.5">
              Activity
            </label>
            <textarea
              rows="2"
              required
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
            />
          </div>

          {/* Botones Cancel y Confirm */}
          <div className="pt-4 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-1.5 rounded-full bg-[#F05A1A] hover:bg-[#d94d12] text-white text-xs font-semibold border border-[#1E5AA8] transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-1.5 rounded-full bg-[#F05A1A] hover:bg-[#d94d12] text-white text-xs font-semibold border border-[#1E5AA8] transition duration-200 cursor-pointer"
            >
              Confirm
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}