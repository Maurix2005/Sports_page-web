import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/Protected_routes';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/User/Dashboard';
import MyLoans from './pages/User/My_loans';
import ItemManagement from './pages/Admin/itemManagement';
import Reception from './pages/Admin/Reception';
import UsersManagement from './pages/Admin/Users';

const App = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userSession');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (authData) => {
    localStorage.setItem('userToken', authData.token);
    localStorage.setItem('userSession', JSON.stringify(authData.user));
    setUser(authData.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userSession');
    setUser(null);
  };

  return (
    <BrowserRouter>
      {user && <NavBar user={user} onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={user.rol === 'ADMIN' ? '/admin/items' : '/inventory'} replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/inventory" replace /> : <Register />}
        />

        {/* Rutas USER */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-loans"
          element={
            <ProtectedRoute user={user}>
              <MyLoans />
            </ProtectedRoute>
          }
        />

        {/* Rutas ADMIN (sin <div> duplicando título) */}
        <Route
          path="/admin/items"
          element={
            <ProtectedRoute user={user} requiredRole="ADMIN">
              <ItemManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reception"
          element={
            <ProtectedRoute user={user} requiredRole="ADMIN">
              <Reception />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute user={user} requiredRole="ADMIN">
              <UsersManagement />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;