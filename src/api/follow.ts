import axiosInstance from './axiosInstance';
import { FOLLOW_URL } from '../constants/endpoint';

export const follow = {
  toggleFollow: async (userId: string) => {
    const { data } = await axiosInstance.post(FOLLOW_URL, { userId });
    return data as { userId: string };
  },
};
