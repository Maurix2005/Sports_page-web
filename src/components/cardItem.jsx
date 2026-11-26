import React from 'react';

const ItemCard = ({ item, onSelect }) => {
  const nombre = item.nombre || item.name || 'Sin nombre';
  const codigo = item.codigo || item.code || '';
  const deporte = item.deporte || item.sport || 'General';
  const estado = (item.estadoFisico || item.condition || 'BUENO').toUpperCase();
  const disponibles = item.disponibles ?? item.available ?? item.cantidadTotal ?? 0;
  const total = item.cantidadTotal ?? item.total ?? disponibles;

  const getConditionBadgeStyle = (condition) => {
    switch (condition) {
      case 'NUEVO':
        return 'bg-[#0050B3] text-white';
      case 'BUENO':
        return 'bg-emerald-600 text-white';
      case 'DESGASTADO':
        return 'bg-[#FB5607] text-white';
      case 'DANADO':
      case 'DAÑADO':
        return 'bg-[#FE3B3B] text-white';
      default:
        return 'bg-[#001326] text-white';
    }
  };

  return (
    <div className="figma-card p-6 flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0050B3]">
            {codigo} • {deporte}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getConditionBadgeStyle(
              estado
            )}`}
          >
            {estado}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-[#001326] mb-1">
          {nombre}
        </h3>

        <p className="text-xs font-semibold text-[#001326]/80">
          Disponibles:{' '}
          <span className="font-extrabold text-[#001326]">
            {disponibles} / {total}
          </span>
        </p>
      </div>

      <button
        type="button"
        disabled={disponibles < 1}
        onClick={() => onSelect && onSelect(item)}
        className="figma-btn-orange w-full py-2 text-xs uppercase mt-2"
      >
        {disponibles > 0 ? 'Solicitar préstamo' : 'Sin stock'}
      </button>
    </div>
  );
};

export default ItemCard;