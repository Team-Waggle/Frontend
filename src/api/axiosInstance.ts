import axios from 'axios';
import { useAccessTokenStore } from '../stores/authStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAccessTokenStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
