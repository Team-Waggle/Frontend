import axiosInstance from './axiosInstance';
import { PROJECTS_DETAIL_URL, PROJECTS_URL } from '../constants/endpoint';
import { ProjectBody } from '../types/api/request/project';

export interface GetProjectsParams {
  page: number;
  size: number;
  sort: string;
  query: string;
}

export const getProjects = async (params: GetProjectsParams) => {
  const { data } = await axiosInstance.get(PROJECTS_URL, { params });
  return data.payload;
};

export const postProject = async (payload: ProjectBody) => {
  const { data } = await axiosInstance.post(PROJECTS_URL, payload);
  return data;
};

export const getProjectDetail = async (projectId: number) => {
  const { data } = await axiosInstance.get(PROJECTS_DETAIL_URL(projectId));
  return data.payload;
};

export const updateProject = async (
  projectId: number,
  payload: ProjectBody,
) => {
  const { data } = await axiosInstance.put(
    PROJECTS_DETAIL_URL(projectId),
    payload,
  );
  return data;
};

export const deleteProject = async (projectId: number) => {
  const { data } = await axiosInstance.delete(PROJECTS_DETAIL_URL(projectId));
  return data;
};
