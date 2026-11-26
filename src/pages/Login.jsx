import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/apiClient';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Petición al endpoint de la rúbrica: POST /api/auth/login
      // (apiFetch ya envía automáticamente el header x-api-token)
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // La API responde con { token: "eyJhbG...", user: { id, nombre, rol } }
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }

      // Redirigir según el rol devuelto por el JWT/usuario
      navigate(data.user?.rol === 'ADMIN' ? '/admin/items' : '/inventory');
    } catch (err) {
      setError(err.message || 'Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#021226] flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Columna Izquierda: Logo */}
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/logo.png" 
            alt="Logo Coordinación Deportiva" 
            className="w-80 h-80 object-contain drop-shadow-lg"
          />
        </div>

        {/* Columna Derecha: Tarjeta de Formulario */}
        <div className="bg-[#EAE2D3] border-[3px] border-[#F05A1A] rounded-3xl p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-xl text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[#021226] font-bold text-sm mb-2">
                Email:
              </label>
              <input
                type="email"
                required
                placeholder="admin@equipo-b2.utr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] focus:outline-none focus:ring-2 focus:ring-[#F05A1A] disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-[#021226] font-bold text-sm mb-2">
                Password:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] focus:outline-none focus:ring-2 focus:ring-[#F05A1A] disabled:opacity-60"
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#F05A1A] hover:bg-[#d94d12] text-white font-semibold py-2 px-6 rounded-full border border-[#1E5AA8] transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Log in'}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate('/register')}
                className="flex-1 bg-[#F05A1A] hover:bg-[#d94d12] text-white font-semibold py-2 px-6 rounded-full border border-[#1E5AA8] transition duration-200 cursor-pointer disabled:opacity-50"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;