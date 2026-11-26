import React, { useState } from 'react';
import ItemCard from './ItemCard';
import RequestLoan from './RequestLoan';

// Datos de prueba replicando tu Figma (puedes reemplazarlos con los 12 artículos de tu API)
const SAMPLE_EQUIPMENT = [
  { id: 1, code: 'DEP-01', name: 'Balón Fútbol #5', sport: 'Fútbol', category: 'Soccer', condition: 'BUENO', available: 8 },
  { id: 2, code: 'DEP-15', name: 'Red de Voleibol', sport: 'Voleibol', category: 'Volley', condition: 'DESGASTADO', available: 0 },
  { id: 3, code: 'DEP-07', name: 'Balón Básquetbol #7', sport: 'Básquetbol', category: 'Basket', condition: 'NUEVO', available: 5 },
  { id: 4, code: 'DEP-02', name: 'Conos de Entrenamiento', sport: 'Fútbol', category: 'Soccer', condition: 'BUENO', available: 12 },
  { id: 5, code: 'DEP-09', name: 'Balón Voleibol Playa', sport: 'Voleibol', category: 'Volley', condition: 'NUEVO', available: 4 },
  { id: 6, code: 'DEP-11', name: 'Casacas Deportivas', sport: 'Fútbol', category: 'Soccer', condition: 'BUENO', available: 15 },
];

const SPORT_FILTERS = ['Todos', 'Soccer', 'Volley'];

export default function Dashboard({ equipment = SAMPLE_EQUIPMENT, onLoanSubmitted }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('Todos');
  const [selectedItemForLoan, setSelectedItemForLoan] = useState(null);

  // Filtrado por barra de búsqueda (nombre o código) y categoría de deporte
  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSport =
      selectedSport === 'Todos' ||
      item.category.toLowerCase() === selectedSport.toLowerCase() ||
      item.sport.toLowerCase() === selectedSport.toLowerCase();

    return matchesSearch && matchesSport;
  });

  // Si hay un artículo seleccionado para préstamo, mostramos la vista RequestLoan
  if (selectedItemForLoan) {
    return (
      <RequestLoan
        item={{
          name: selectedItemForLoan.name,
          condition: selectedItemForLoan.condition,
          available: selectedItemForLoan.available,
        }}
        onCancel={() => setSelectedItemForLoan(null)}
        onConfirm={(loanData) => {
          console.log('Préstamo solicitado:', loanData);
          if (onLoanSubmitted) onLoanSubmitted(loanData);
          setSelectedItemForLoan(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#021226] py-10 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Título */}
        <h1 className="text-white text-2xl font-bold mb-5 tracking-wide">
          Equipment Inventory:
        </h1>

        {/* Barra de Búsqueda + Filtros por Deporte */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-10">
          {/* Input de búsqueda redondeado */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar artículo o código (ej. DEP-01)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-2 rounded-full bg-[#DCE2EA] text-[#021226] text-sm font-medium placeholder-[#021226]/50 focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
            />
          </div>

          {/* Selector de Deporte */}
          <div className="flex items-center flex-wrap gap-2.5">
            <span className="text-white font-bold text-base mr-1">
              Sport:
            </span>
            {SPORT_FILTERS.map((sport) => {
              const isActive = selectedSport === sport;
              return (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSelectedSport(sport)}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F05A1A] text-white border border-[#F05A1A]'
                      : 'bg-transparent text-white border border-white hover:border-[#F05A1A] hover:text-[#F05A1A]'
                  }`}
                >
                  {sport}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cuadrícula de Tarjetas de Inventario */}
        {filteredEquipment.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onRequestLoan={(chosenItem) => setSelectedItemForLoan(chosenItem)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#EAE2D3]/10 border border-[#F05A1A]/40 rounded-3xl p-10 text-center text-white/80 text-sm">
            No se encontraron artículos que coincidan con tu búsqueda.
          </div>
        )}

      </div>
    </div>
  );
}