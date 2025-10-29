import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { USER_FOLLOEES, USER_FOLLOWERS } from '../constants/endpoint';
import { FollowUser } from '../types/ProfileApi';

export const useFollowList = (userId: string) => {
  const [followers, setFollowers] = useState<FollowUser[]>([]);
  const [followees, setFollowees] = useState<FollowUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFollowList = async () => {
      try {
        setLoading(true);

        const [followersRes, followeesRes] = await Promise.all([
          axiosInstance.get(USER_FOLLOWERS, { params: { userId } }),
          axiosInstance.get(USER_FOLLOEES, { params: { userId } }),
        ]);

        setFollowers(followersRes.data.payload || []);
        setFollowees(followeesRes.data.payload || []);
      } catch (err) {
        console.error('팔로우 리스트 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowList();
  }, [userId]);

  return { followers, followees, loading };
};
