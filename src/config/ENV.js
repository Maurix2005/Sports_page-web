const ENV = {
  API_URL: process.env.VITE_PUBLIC_API_URL || 'http://localhost:3000/api',
  API_TIMEOUT: Number(process.env.VITE_PUBLIC_API_TIMEOUT) || 10000,
};

export default ENV;