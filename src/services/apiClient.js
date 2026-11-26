import { ENV } from '../config/ENV';

export async function apiFetch(endpoint, options = {}) {
  const userToken = localStorage.getItem('userToken');

  const headers = {
    'Content-Type': 'application/json',
    'x-api-token': ENV.APP_TOKEN, // Primer JWT (Aplicación Cliente)
    ...(userToken && { Authorization: `Bearer ${userToken}` }), // Segundo JWT (Usuario)
    ...options.headers,
  };

  // Evitar dobles diagonales // en la URL
  const baseUrl = ENV.API_URL?.replace(/\/$/, '') || '';
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const response = await fetch(`${baseUrl}${cleanEndpoint}`, {
    ...options,
    headers,
  });

  // Manejo obligatorio de 401 Unauthorized (excepto al intentar hacer login)
  if (response.status === 401 && !cleanEndpoint.includes('/auth/login')) {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userSession');
    window.location.href = '/login';
    throw new Error('Sesión expirada. Redirigiendo al login...');
  }

  // Manejo obligatorio de 403 Forbidden
  if (response.status === 403) {
    alert('Acceso restringido (403): No tienes permisos para realizar esta acción.');
    throw new Error('Acceso prohibido');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Error HTTP: ${response.status}`);
  }

  return data;
}