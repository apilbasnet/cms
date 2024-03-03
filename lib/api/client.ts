import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});
