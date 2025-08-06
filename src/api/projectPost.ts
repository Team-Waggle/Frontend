import axiosInstance from './axiosInstance';
import { PROJECTS_DETAIL_URL, PROJECTS_URL } from '../constants/endpoint';
import { CardData } from '../types/card';
import { PageResponse } from '../types/pageResponse';
import { ProjectsFilters } from '../types/projectsFilters';

export const getProjects = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
  filters: ProjectsFilters,
): Promise<PageResponse<CardData>> => {
  const { data } = await axiosInstance.get(PROJECTS_URL, {
    params: {
      page,
      size,
      sort,
      filters,
    },
  });
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
