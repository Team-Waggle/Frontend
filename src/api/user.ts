import { USER_ME_URL, USER_PROFILE_IMAGE } from '../constants/endpoint';
import type { UserMeResponse, UpdateUserDto } from '../types/user';
import axiosInstance from './axiosInstance';

export async function getUserMe(): Promise<UserMeResponse> {
  const { data } = await axiosInstance.get<UserMeResponse>(USER_ME_URL);
  return data;
}

export async function updateUserMe(payload: UpdateUserDto): Promise<UserMeResponse> {
  const { data } = await axiosInstance.put<UserMeResponse>(USER_ME_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
}

export async function deleteUserMe(): Promise<UserMeResponse> {
  const { data } = await axiosInstance.delete<UserMeResponse>(USER_ME_URL);
  return data;
}

export async function uploadUserProfileImage(file: File): Promise<UserMeResponse> {
  const formData = new FormData();
  formData.append('profileImage', file);

  const { data } = await axiosInstance.post<UserMeResponse>(USER_PROFILE_IMAGE, formData);

  return data;
};