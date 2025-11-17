import axios from './axiosInstance';
import {
  PROJECT_ME_URL,
  PROJECTS_APPLICATION_URL,
  PROJECTS_APPLY_URL,
  PROJECTS_APPROVAL_URL,
  PROJECTS_CONFIRM_URL,
  PROJECTS_REJECT_URL,
} from '../constants/endpoint';
import axiosInstance from './axiosInstance';

export type UserProfile = {
  id: string;
  name: string;
  email?: string;
  position?: string;
  year_count?: number;
  yearCount?: number;
  profile_img_url?: string;
  status?: string;
  [k: string]: any;
};

export function normalizeApplicants(payload: any): UserProfile[] {
  if (Array.isArray(payload)) {
    return payload
      .map((it) => {
        const user = it?.user ?? it;
        if (!user) return null;
        return {
          ...user,
          status: it?.status ?? user?.status,
        } as UserProfile;
      })
      .filter(Boolean) as UserProfile[];
  }

  if (payload?.user) {
    return [
      {
        ...(payload.user as object),
        status: payload?.status ?? payload?.user?.status,
      } as UserProfile,
    ];
  }

  return payload
    ? [
        {
          ...(payload as object),
          status: (payload as any)?.status,
        } as UserProfile,
      ]
    : [];
}

export async function getApplicants(projectId: number): Promise<UserProfile[]> {
  const { data } = await axios.get(PROJECTS_APPLICATION_URL(projectId));
  return normalizeApplicants(data?.payload);
}

export async function approveApplicant(projectId: number, userId: string) {
  const { data } = await axios.put(PROJECTS_APPROVAL_URL(projectId, userId));
  return data;
}

export async function rejectApplicant(projectId: number, userId: string) {
  const { data } = await axios.put(PROJECTS_REJECT_URL(projectId, userId));
  return data;
}

export const postApply = async (projectId: number, position: string) => {
  const { data } = await axiosInstance.post(PROJECTS_APPLY_URL(projectId), {
    position,
  });
  return data.payload;
};

export const deleteApply = async (projectId: number) => {
  const { data } = await axiosInstance.delete(PROJECTS_APPLY_URL(projectId));
  return data.payload;
};

export const getMyApply = async (status?: string) => {
  const { data } = await axiosInstance.get(PROJECT_ME_URL, {
    params: { status },
  });
  return data.payload;
};

export const confirmApply = async (projectId: number) => {
  const { data } = await axios.put(PROJECTS_CONFIRM_URL(projectId));
  return data.payload;
};
