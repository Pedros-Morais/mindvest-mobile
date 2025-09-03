import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sua-api.com', 
  timeout: 10000 
});


api.interceptors.request.use(
  (config) => {
    const token = 'SEU_TOKEN_AQUI'; 
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
    }
    return Promise.reject(error);
  }
);

export default api;
