import React from 'react';

export default function ItemCard({ item, onRequestLoan }) {
  const { code, name, sport, condition, available } = item;
  const isOutOfStock = available <= 0;

  // Estilos dinámicos para la etiqueta de condición (esquina superior derecha)
  const getConditionBadgeStyle = (cond) => {
    const normalized = cond.toUpperCase();
    if (normalized === 'NUEVO') {
      return 'bg-[#0A4D9C] text-white border border-[#0A4D9C]';
    }
    if (normalized === 'DESGASTADO') {
      return 'bg-[#F05A1A] text-white border border-[#F05A1A]';
    }
    // Por defecto: BUENO
    return 'bg-transparent text-[#021226] border border-[#021226]';
  };

  return (
    <div className="bg-[#EAE2D3] border-[3px] border-[#F05A1A] rounded-3xl p-5 shadow-xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1">
      <div>
        {/* Fila superior: Código y Badge de estado */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-[#021226]/60 tracking-wider uppercase">
            {code}
          </span>
          <span
            className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getConditionBadgeStyle(
              condition
            )}`}
          >
            {condition}
          </span>
        </div>

        {/* Nombre del artículo */}
        <h3 className="text-[#021226] font-extrabold text-lg leading-snug mb-3">
          {name}
        </h3>

        {/* Fila inferior de info: Deporte y Disponibilidad */}
        <div className="flex items-center justify-between text-xs font-semibold mb-4">
          <span className="text-[#021226]/70">{sport}</span>
          {isOutOfStock ? (
            <span className="text-[#F05A1A] font-bold">Agotado</span>
          ) : (
            <span className="text-[#1E5AA8] font-bold">
              {available} disponibles
            </span>
          )}
        </div>
      </div>

      {/* Botón de acción */}
      <button
        type="button"
        disabled={isOutOfStock}
        onClick={() => onRequestLoan && onRequestLoan(item)}
        className={`w-full py-2 rounded-full text-xs font-bold tracking-wide transition duration-200 ${
          isOutOfStock
            ? 'bg-[#C4BDB2] text-[#021226]/50 cursor-not-allowed'
            : 'bg-[#F05A1A] hover:bg-[#d94d12] text-white border border-[#1E5AA8] cursor-pointer shadow-sm'
        }`}
      >
        Solicitar préstamo
      </button>
    </div>
  );
}