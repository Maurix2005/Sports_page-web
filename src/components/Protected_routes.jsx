import React from 'react';
import { Navigate, Link } from 'react-router-dom';

const ProtectedRoute = ({ user, requiredRole, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    return (
      <div className="min-h-[80vh] bg-[#001326] flex items-center justify-center p-6">
        <div className="max-w-md w-full figma-card p-8 text-center space-y-4">
          <h2 className="text-[#FE3B3B]">403 — Acceso Denegado</h2>
          <p className="text-sm font-semibold">
            No tienes permisos de administrador para ver esta sección.
          </p>
          <Link
            to="/inventory"
            className="inline-block figma-btn-orange px-6 py-2 text-xs uppercase"
          >
            Volver al Inventario
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;