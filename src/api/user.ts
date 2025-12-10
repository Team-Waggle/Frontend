import {
  USER_ME_URL,
  USER_PROFILE_COMPLETE,
  USER_PROFILE_IMAGE,
  USER_SEARCH_URL,
  USER_URL,
} from '../constants/endpoint';
import type { UserMeResponse, UpdateUserDto } from '../types/user';
import axiosInstance from './axiosInstance';

export async function getUserMe(): Promise<UserMeResponse> {
  const { data } = await axiosInstance.get<UserMeResponse>(USER_ME_URL);
  return data;
}

export async function getUserById(userId: string): Promise<UserMeResponse> {
  const { data } = await axiosInstance.get<UserMeResponse>(USER_URL(userId));
  return data;
}

export async function updateUserMe(
  payload: UpdateUserDto,
): Promise<UserMeResponse> {
  const { data } = await axiosInstance.put<UserMeResponse>(
    USER_ME_URL,
    payload,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return data;
}

type BasicSuccessResponse = { success: boolean };

export async function deleteUserMe(): Promise<BasicSuccessResponse | UserMeResponse> {
  const res = await axiosInstance.delete(USER_ME_URL);

  if (res.status === 204) {
    return { success: true };
  }

  return res.data as UserMeResponse;
}

export async function uploadUserProfileImage(
  file: File,
): Promise<UserMeResponse> {
  const formData = new FormData();
  formData.append('profileImage', file);

  const { data } = await axiosInstance.post<UserMeResponse>(
    USER_PROFILE_IMAGE,
    formData,
  );

  return data;
}

export const getUsersAll = async (query: string) => {
  const { data } = await axiosInstance.get(USER_SEARCH_URL, {
    params: { query },
  });
  return data.payload;
};

export const getUserProfileComplete = async () => {
  const { data } = await axiosInstance.get(USER_PROFILE_COMPLETE);
  return data.payload;
};
