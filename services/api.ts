import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = process.env.EXPO_PUBLIC_API_TOKEN; // opcional
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Erro da API:', error.response.data);
    } else if (error.request) {
      console.error('Erro de rede:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
    return Promise.reject(error);
  }
);

export default api;
