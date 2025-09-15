import { LOGOUT_URL, REISSUE_URL } from '../constants/endpoint';
import axiosInstance from './axiosInstance';

export const logout = async (refresh_token: string) => {
  const { data } = await axiosInstance.post(
    `${LOGOUT_URL}?refresh_token=${refresh_token}`,
  );
  return data;
};

export const reissue = async (refresh_token: string) => {
  const { data } = await axiosInstance.post(REISSUE_URL, { refresh_token });
  return data;
};
