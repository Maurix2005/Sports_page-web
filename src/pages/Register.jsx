import React, { useState } from 'react';

export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Usuario registrado:', formData);
    if (onSwitchToLogin) onSwitchToLogin();
  };

  return (
    <div className="min-h-screen bg-[#021226] flex flex-col items-center justify-center p-6 font-sans">
      
      <h1 className="text-white text-2xl font-bold mb-6 tracking-wide">
        Register Form
      </h1>

      <div className="max-w-xl w-full bg-[#EAE2D3] border-[3px] border-[#F05A1A] rounded-3xl p-8 md:p-10 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            
            {/* Name */}
            <div>
              <label className="block text-[#021226] font-bold text-xs mb-1.5">
                Name:
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
              />
            </div>

            {/* ID */}
            <div>
              <label className="block text-[#021226] font-bold text-xs mb-1.5">
                ID:
              </label>
              <input
                type="text"
                name="id"
                required
                value={formData.id}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#021226] font-bold text-xs mb-1.5">
                Email:
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-[#021226] font-bold text-xs mb-1.5">
                Role:
              </label>
              <input
                type="text"
                name="role"
                placeholder="Ej. Student / Admin"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#021226] font-bold text-xs mb-1.5">
                Password:
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#021226] font-bold text-xs mb-1.5">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-full bg-[#DCE2EA] border border-[#1E5AA8] text-[#021226] text-sm focus:outline-none focus:ring-2 focus:ring-[#F05A1A]"
              />
            </div>

          </div>

          {/* Botón Sign up centrado */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="bg-[#F05A1A] hover:bg-[#d94d12] text-white font-semibold py-2 px-10 rounded-full border border-[#1E5AA8] transition duration-200 cursor-pointer"
            >
              Sign up
            </button>
            
            {onSwitchToLogin && (
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-xs text-[#021226] underline hover:text-[#F05A1A] cursor-pointer"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}