import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/apiClient';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    matricula: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      // Petición real al endpoint POST /api/auth/register
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.nombre,
          matricula: formData.matricula,
          email: formData.email,
          password: formData.password,
          rol: 'USER',
        }),
      });

      // Redirección automática al Login tras registro exitoso
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001326] flex flex-col items-center justify-center p-6">
      <h1 className="text-white text-2xl font-bold mb-6 tracking-wide">
        Register Form
      </h1>

      <div className="max-w-xl w-full figma-card p-8 md:p-10">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <label className="block font-bold text-xs mb-1.5">Name:</label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                className="figma-input"
              />
            </div>

            <div>
              <label className="block font-bold text-xs mb-1.5">ID:</label>
              <input
                type="text"
                name="matricula"
                required
                value={formData.matricula}
                onChange={handleChange}
                disabled={loading}
                className="figma-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-xs mb-1.5">Email:</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="figma-input"
              />
            </div>

            <div>
              <label className="block font-bold text-xs mb-1.5">Password:</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="figma-input"
              />
            </div>

            <div>
              <label className="block font-bold text-xs mb-1.5">
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className="figma-input"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="figma-btn-orange py-2 px-10 text-sm"
            >
              {loading ? 'Registrando...' : 'Sign up'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-xs text-[#001326] underline hover:text-[#FB5607] cursor-pointer"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;