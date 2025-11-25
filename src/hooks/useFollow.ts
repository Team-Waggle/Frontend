import { useEffect, useState } from 'react';
import { followStore } from '../stores/followStore';
import axiosInstance from '../api/axiosInstance';
import { USER_FOLLOEES, FOLLOW_URL } from '../constants/endpoint';

export const useFollow = (userId: string) => {
  const isFollowed = followStore((state) => state.followMap[userId] ?? false);
  const setFollow = followStore((state) => state.setFollow);
  const toggleFollowStore = followStore((state) => state.toggleFollow);
  const [followeesCount, setFolloweesCount] = useState<number>(0);

  useEffect(() => {
    const fetchFollowees = async () => {
      try {
        const { data } = await axiosInstance.get(USER_FOLLOEES);

        const followeesArray: string[] = Array.isArray(data.payload)
          ? data.payload.map((user: any) => user.userId)
          : [];

        followeesArray.forEach((id) => setFollow(id, true));

        setFolloweesCount(followeesArray.length);
      } catch (err) {
        console.error('팔로우 상태 초기화 실패:', err);
      }
    };

    fetchFollowees();
  }, [setFollow]);

  const toggleFollow = async () => {
    toggleFollowStore(userId);

    try {
      await axiosInstance.post(FOLLOW_URL, { userId });
      setFolloweesCount((prev) => {
        const n = typeof prev === 'number' ? prev : 0;
        return isFollowed ? n - 1 : n + 1;
      });
    } catch (err) {
      console.error('팔로우 처리 실패:', err);
      toggleFollowStore(userId);
      alert('팔로우 처리 중 오류가 발생했습니다.');
    }
  };

  return { isFollowed, toggleFollow, followeesCount };
};
