import axios from 'axios';
import ENV from '../config/ENV';

export const TOKEN_KEYS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
};

const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  // Descomenta la siguiente línea si tu backend usa Cookies HttpOnly para el Refresh Token:
  // withCredentials: true,
});

// Control de cola para peticiones simultáneas mientras se renueva el token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 1. INTERCEPTOR DE PETICIÓN: Adjunta el Access Token desde localStorage
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(TOKEN_KEYS.ACCESS);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. INTERCEPTOR DE RESPUESTA: Renueva el token ante un error 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH);

        if (!refreshToken) {
          throw new Error('No hay refresh token disponible');
        }

        // Llamada con axios limpio para evitar ciclos infinitos en el interceptor
        const { data } = await axios.post(`${ENV.API_URL}/auth/refresh`, {
          refreshToken,
        });

        // Guardar nuevos tokens
        localStorage.setItem(TOKEN_KEYS.ACCESS, data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem(TOKEN_KEYS.REFRESH, data.refreshToken);
        }

        apiClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        processQueue(null, data.accessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Limpiar sesión y redirigir al login en web
        localStorage.removeItem(TOKEN_KEYS.ACCESS);
        localStorage.removeItem(TOKEN_KEYS.REFRESH);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;