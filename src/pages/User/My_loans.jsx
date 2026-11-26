import React, { useState } from 'react';

// Datos de ejemplo (puedes reemplazarlos con un fetch a tu API usando tu token)
const INITIAL_LOANS = [
  { id: 1, item: 'BALL', cant: 3, outDate: '18 de nov', act: 'Torneo', status: 'ACTIVE' },
  { id: 2, item: 'BALL', cant: 3, outDate: '18 de nov', act: 'Torneo', status: 'ACTIVE' },
  { id: 3, item: 'BALL', cant: 3, outDate: '18 de nov', act: 'Torneo', status: 'ACTIVE' },
  { id: 4, item: 'BALL', cant: 3, outDate: '18 de nov', act: 'Torneo', status: 'ACTIVE' },
  { id: 5, item: 'NET', cant: 1, outDate: '10 de nov', act: 'Entrenamiento', status: 'RETURNED' },
];

export default function MyLoans({ loans = INITIAL_LOANS }) {
  const [activeTab, setActiveTab] = useState('actives'); // 'actives' | 'history'

  // Filtrar préstamos según la pestaña seleccionada
  const filteredLoans = loans.filter((loan) =>
    activeTab === 'actives' ? loan.status === 'ACTIVE' : loan.status !== 'ACTIVE'
  );

  return (
    <div className="min-h-screen bg-[#021226] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full">
        
        {/* Encabezado y Pestañas */}
        <div className="mb-6 pl-2">
          <h1 className="text-white text-2xl font-bold mb-3 tracking-wide">
            My Loans:
          </h1>

          {/* Selector tipo píldora: Actives / History */}
          <div className="inline-flex bg-[#0A4D9C] rounded-full p-0.5 border border-[#1E5AA8]">
            <button
              type="button"
              onClick={() => setActiveTab('actives')}
              className={`px-6 py-1 rounded-full text-xs font-bold transition duration-200 cursor-pointer ${
                activeTab === 'actives'
                  ? 'bg-[#DCE2EA] text-[#0A4D9C] shadow'
                  : 'text-white hover:text-[#DCE2EA]'
              }`}
            >
              Actives
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`px-6 py-1 rounded-full text-xs font-bold transition duration-200 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-[#DCE2EA] text-[#0A4D9C] shadow'
                  : 'text-white hover:text-[#DCE2EA]'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Tarjeta Principal */}
        <div className="bg-[#EAE2D3] border-[3px] border-[#F05A1A] rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-[#021226] font-extrabold text-base mb-4">
            {activeTab === 'actives' ? 'Active Loans:' : 'Loan History:'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[#021226] text-xs font-bold">
                  <th className="pb-3 pr-4">Item:</th>
                  <th className="pb-3 px-4">Cant:</th>
                  <th className="pb-3 px-4">Out/date</th>
                  <th className="pb-3 px-4">ACT:</th>
                  <th className="pb-3 pl-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#021226] font-semibold">
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <tr key={loan.id}>
                      {/* Celdas con línea inferior (dejando espacio antes del botón, igual que en Figma) */}
                      <td className="py-2.5 pr-4 border-b border-[#021226]/50">
                        {loan.item}
                      </td>
                      <td className="py-2.5 px-4 border-b border-[#021226]/50">
                        {loan.cant}
                      </td>
                      <td className="py-2.5 px-4 border-b border-[#021226]/50">
                        {loan.outDate}
                      </td>
                      <td className="py-2.5 px-4 border-b border-[#021226]/50">
                        {loan.act}
                      </td>
                      
                      {/* Etiqueta / Botón de Estado */}
                      <td className="py-2 pl-6 text-right">
                        <span
                          className={`inline-block px-5 py-1 rounded-full text-[11px] font-bold tracking-wider text-white border border-[#1E5AA8] ${
                            loan.status === 'ACTIVE'
                              ? 'bg-[#F05A1A]'
                              : 'bg-gray-500'
                          }`}
                        >
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-[#021226]/70">
                      No hay préstamos en esta sección.
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
}