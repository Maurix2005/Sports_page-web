import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  // 1. Si no hay sesión activa -> al Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta exige un rol específico (ej. ADMIN) y el usuario no lo tiene -> Acceso denegado / redirigir
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#EAE2D3] border-[3px] border-[#F05A1A] rounded-3xl p-8 max-w-md text-[#021226]">
          <h2 className="text-xl font-extrabold mb-2">403 - Acceso Restringido</h2>
          <p className="text-sm mb-4">
            Esta sección es exclusiva para Coordinación Deportiva (ADMIN).
          </p>
          <a
            href="/inventory"
            className="inline-block px-6 py-2 rounded-full bg-[#F05A1A] text-white text-xs font-bold"
          >
            Volver al Inventario
          </a>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;