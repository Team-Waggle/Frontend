import {
  PROJECTS_BOOKMARK_ME_URL,
  PROJECTS_BOOKMARK_URL,
} from '../constants/endpoint';
import axiosInstance from './axiosInstance';

export const postBookmark = async (projectId: number) => {
  const { data } = await axiosInstance.post(PROJECTS_BOOKMARK_URL(projectId));
  return data;
};

export const myBookmark = async () => {
  const { data } = await axiosInstance.get(PROJECTS_BOOKMARK_ME_URL);
  return data;
};
