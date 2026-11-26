import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Componentes
import Navbar from './components/NavBar';
import ProtectedRoute from './components/Protected_routes';

// Páginas Públicas
import Login from './pages/Login';
import Register from './pages/Register';

// Páginas Proyecto B (Usuario)
import Dashboard from './pages/User/Dashboard';
import MyLoans from './pages/User/My_loans';

// Páginas Proyecto B (Admin - créalas en src/pages/Admin/)
import ItemManagement from './pages/Admin/itemManagement';
import Reception from './pages/Admin/Reception';
import UsersManagement from './pages/Admin/Users';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('userSession');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (authResponse) => {
    // La API devuelve { token: "eyJhbG...", user: { id, nombre, rol } }
    localStorage.setItem('userToken', authResponse.token);
    localStorage.setItem('userSession', JSON.stringify(authResponse.user));
    setUser(authResponse.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userSession');
    setUser(null);
  };

  const homeByRole = user?.rol === 'ADMIN' ? '/admin/items' : '/inventory';

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#021226] text-white font-sans">
        {user && <Navbar user={user} onLogout={handleLogout} />}

        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route
            path="/login"
            element={user ? <Navigate to={homeByRole} replace /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to={homeByRole} replace /> : <Register />}
          />

          {/* RUTAS PROYECTO B: USUARIO (USER y ADMIN) */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute user={user} allowedRoles={['USER', 'ADMIN']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-loans"
            element={
              <ProtectedRoute user={user} allowedRoles={['USER', 'ADMIN']}>
                <MyLoans />
              </ProtectedRoute>
            }
          />

          {/* RUTAS PROYECTO B: PANEL ADMINISTRADOR (Solo ADMIN) */}
          <Route
            path="/admin/items"
            element={
              <ProtectedRoute user={user} allowedRoles={['ADMIN']}>
                <div className="p-8 text-center">Alta y Edición de Ítems</div>
                <ItemManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reception"
            element={
              <ProtectedRoute user={user} allowedRoles={['ADMIN']}>
                <div className="p-8 text-center">Recepción de Material</div>
                <Reception />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute user={user} allowedRoles={['ADMIN']}>
                <div className="p-8 text-center">Gestión de Usuarios</div>
                <UsersManagement />
              </ProtectedRoute>
            }
          />

          {/* REDIRECCIÓN POR DEFECTO */}
          <Route path="*" element={<Navigate to={user ? homeByRole : '/login'} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;