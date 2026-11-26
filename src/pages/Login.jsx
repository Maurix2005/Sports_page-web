import React, { useState } from 'react';
import { API_CONFIG, TEST_USERS } from '../services/apiConfig';

export default function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // OPCIÓN A: Validación directa contra las credenciales del JSON de tu API
    const matchedUser = TEST_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      // Guardamos la sesión y el token de tu API en localStorage
      localStorage.setItem('apiToken', API_CONFIG.TOKEN);
      localStorage.setItem('userSession', JSON.stringify({
        email: matchedUser.email,
        rol: matchedUser.rol,
        equipo: API_CONFIG.EQUIPO
      }));

      if (onLoginSuccess) onLoginSuccess(matchedUser);
      return;
    }

    setError('Correo o contraseña incorrectos');

    /* 
    // OPCIÓN B: Si tu API tiene un endpoint POST /login que recibe el token en los headers:
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.TOKEN}`
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('apiToken', API_CONFIG.TOKEN);
        localStorage.setItem('userSession', JSON.stringify(data));
        onLoginSuccess(data);
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con la API');
    }
    */
  };

  return (
    <div className="min-h-screen bg-[#021226] flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Columna Izquierda: Logo */}
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/logo-lince.png" 
            alt="Logo Coordinación Deportiva" 
            className="w-56 h-56 object-contain drop-shadow-lg"
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
                className="w-full px-4 py-2 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
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
                className="w-full px-4 py-2 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#F05A1A] hover:bg-[#d94d12] text-white font-semibold py-2 px-6 rounded-full border border-[#1E5AA8] transition duration-200 cursor-pointer"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="flex-1 bg-[#F05A1A] hover:bg-[#d94d12] text-white font-semibold py-2 px-6 rounded-full border border-[#1E5AA8] transition duration-200 cursor-pointer"
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