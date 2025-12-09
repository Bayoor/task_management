import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
