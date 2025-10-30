import axiosInstance from '../api/axiosInstance';
import { USER_PROJECT } from '../constants/endpoint';
import { PROJECTS_APPLICATION_URL, PROJECTS_MEMBER_URL } from '../constants/endpoint';
import type { ProjectPayload } from '../types/api/response/payload/project';

type ApiEnvelope<T> = {
  code: number;
  message: string;
  payload: T;
  timestamp: string;
  success: boolean;
};

export async function getUserProjects(): Promise<ProjectPayload[]> {
  const { data } = await axiosInstance.get<ApiEnvelope<ProjectPayload | ProjectPayload[]>>(
    USER_PROJECT
  );
  const p = data?.payload as any;
  return Array.isArray(p) ? p : [p];
}

export async function getProjectApplicantsCount(projectId: number): Promise<number> {
  const url = PROJECTS_APPLICATION_URL(projectId);
  const { data } = await axiosInstance.get<ApiEnvelope<any>>(url);

  const payload = data?.payload;
  if (Array.isArray(payload)) return payload.length;
  if (payload && typeof payload === 'object') {
    if (typeof payload.total === 'number') return payload.total;
    if (typeof payload.total_count === 'number') return payload.total_count;
    if (typeof payload.count === 'number') return payload.count;
  }
  return 0;
}

export async function getProjectMembersCount(projectId: number): Promise<number> {
  const url = PROJECTS_MEMBER_URL(projectId);
  const { data } = await axiosInstance.get<ApiEnvelope<any>>(url);

  const payload = data?.payload;
  if (Array.isArray(payload)) return payload.length;
  if (payload && typeof payload === 'object') {
    if (typeof payload.total === 'number') return payload.total;
    if (typeof payload.total_count === 'number') return payload.total_count;
    if (typeof payload.count === 'number') return payload.count;
  }
  return 0;
}