import { useCallback } from 'react';
import {
  getUserMe,
  updateUserMe,
  uploadUserProfileImage,
  getUsersAll,
} from '../api/user';
import { useUserStore } from '../stores/userStore';
// import { useAccessTokenStore, useRefreshTokenStore } from '../stores/authStore';
import type { UserMePayload, UpdateUserDto } from '../types/user';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { user, setUser, clearUser } = useUserStore();
  // 2025.11.04 사용 예정
  // const { clearAccessToken } = useAccessTokenStore();
  // const { clearRefreshToken } = useRefreshTokenStore();

  const fetchUser = useCallback(async (): Promise<UserMePayload | null> => {
    const res = await getUserMe();
    if (res.success) {
      setUser(res.payload);
      return res.payload;
    } else {
      clearUser();
      return null;
    }
  }, [setUser, clearUser]);

  const updateUser = useCallback(
    async (payload: UpdateUserDto) => {
      const res = await updateUserMe(payload);
      if (res.success) {
        setUser(res.payload);
        return res.payload;
      } else {
        throw new Error('업데이트 실패');
      }
    },
    [setUser],
  );

  // 서버 오류, 500 에러 발생
  // 백엔드에 이야기 해두고 주석 해제 하도록 하겠습니다.
  // const deleteUser = useCallback(async () => {
  //   try {
  //     const res = await deleteUserMe();
  //     if (res.success) {
  //       clearUser();
  //       clearAccessToken();
  //       clearRefreshToken();
  //       return true;
  //     } else {
  //       clearUser();
  //       clearAccessToken();
  //       clearRefreshToken();
  //       throw new Error('탈퇴 처리 실패 (서버 응답)');
  //     }
  //   } catch (err) {
  //     clearUser();
  //     clearAccessToken();
  //     clearRefreshToken();
  //     throw err;
  //   }
  // }, [clearUser, clearAccessToken, clearRefreshToken]);

  const uploadProfileImage = useCallback(
    async (file: File) => {
      const res = await uploadUserProfileImage(file);
      if (res.success) {
        setUser(res.payload);
        return res.payload;
      } else {
        throw new Error('프로필 이미지 업로드 실패');
      }
    },
    [setUser],
  );

  return {
    user,
    fetchUser,
    updateUser,
    uploadProfileImage,
  };
}

export const useGetUserAllQuery = (query: string) => {
  return useQuery({
    queryKey: ['query', query],
    queryFn: () => getUsersAll(query),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
