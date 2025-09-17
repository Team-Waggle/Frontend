import axios from 'axios';
import { useAccessTokenStore, useRefreshTokenStore } from '../stores/authStore';
import { reissue } from './auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Request interceptor: access token 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAccessTokenStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: 401 발생 시 refresh token으로 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 & 요청이 이미 retry 되지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = useRefreshTokenStore.getState().refreshToken;

      if (!refreshToken) {
        // 리프레시 토큰 없으면 바로 로그아웃
        useAccessTokenStore.getState().clearAccessToken();
        useRefreshTokenStore.getState().clearRefreshToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // refresh API 호출
        const { data } = await reissue(refreshToken);

        // 새 access token 저장
        useAccessTokenStore.getState().setAccessToken(data.payload.accessToken);

        // 원래 요청에 새 토큰 적용 후 재요청
        originalRequest.headers['Authorization'] =
          `Bearer ${data.payload.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰도 만료됨:', refreshError);
        useAccessTokenStore.getState().clearAccessToken();
        useRefreshTokenStore.getState().clearRefreshToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
