import axiosInstance from './axiosInstance';
import { PROJECTS_DETAIL_URL, PROJECTS_URL } from '../constants/endpoint';
import {
  ProjectIndustry,
  ProjectPosition,
  ProjectSkill,
  ProjectWayofWorking,
} from '../types/project';

export interface GetProjectsParams {
  page: number;
  size: number;
  sort: string;
}

export interface PostProjectParams {
  title: string;
  industry: ProjectIndustry;
  work_way: ProjectWayofWorking;
  recruitment_end_date?: string;
  work_period: string;
  skills?: ProjectSkill[];
  recruitments?: {
    position: ProjectPosition;
    remaining_count: number;
    current_count: number;
  }[];
  detail?: string;
  contact_url?: string;
  reference_url?: string;
}

export const getProjects = async (params: GetProjectsParams) => {
  const { data } = await axiosInstance.get(PROJECTS_URL, { params });
  return data.payload;
};

export const postProject = async (payload: PostProjectParams) => {
  const { data } = await axiosInstance.post(PROJECTS_URL, payload);
  return data;
};

export const getProjectDetail = async (projectId: number) => {
  const { data } = await axiosInstance.get(PROJECTS_DETAIL_URL(projectId));
  return data.payload;
};

export const updateProject = async (projectId: number) => {
  const { data } = await axiosInstance.put(PROJECTS_DETAIL_URL(projectId));
  return data;
};
export const deleteProject = async (projectId: number) => {
  const { data } = await axiosInstance.delete(PROJECTS_DETAIL_URL(projectId));
  return data;
};
