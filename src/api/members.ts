import axios from './axiosInstance';
import {
  PROJECTS_MEMBER_URL,
  PROJECTS_MEMBER_REJECT_URL,
} from '../constants/endpoint';

export type UserProfile = {
  id: string;
  name: string;
  email?: string;
  position?: string;
  year_count?: number;
  yearCount?: number;
  profile_img_url?: string;
  [k: string]: any;
};

export function normalizeMembers(payload: any): UserProfile[] {
  if (Array.isArray(payload)) return payload;
  return payload ? [payload] : [];
}

export async function getMembers(projectId: number): Promise<UserProfile[]> {
  const { data } = await axios.get(PROJECTS_MEMBER_URL(projectId));
  return normalizeMembers(data?.payload);
}

export async function kickMember(projectId: number, userId: string) {
  const { data } = await axios.put(PROJECTS_MEMBER_REJECT_URL(projectId, userId));
  return data;
}
