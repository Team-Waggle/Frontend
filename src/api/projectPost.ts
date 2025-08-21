import axiosInstance from './axiosInstance';
import { PROJECTS_DETAIL_URL, PROJECTS_URL } from '../constants/endpoint';

export interface GetProjectsParams {
  page: number;
  size: number;
  sort: string;
  positions?: string; // 쉼표로 join된 id 문자열
  skills?: string;
  industries?: string;
  workPeriods?: string;
  workWays?: string;
}

export const getProjects = async (params: GetProjectsParams) => {
  const { data } = await axiosInstance.get(PROJECTS_URL, { params });
  return data.payload;
};

export const postProject = async () => {};

export const getProjectDetail = async (projectId: number) => {
  const { data } = await axiosInstance.post(PROJECTS_DETAIL_URL(projectId));
  return data;
};

export const updateProject = async (projectId: number) => {
  const { data } = await axiosInstance.put(PROJECTS_DETAIL_URL(projectId));
  return data;
};
export const deleteProject = async (projectId: number) => {
  const { data } = await axiosInstance.delete(PROJECTS_DETAIL_URL(projectId));
  return data;
};
