import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { USER_COUNT_FOLLOWERS } from "../constants/endpoint";

export const useFollowerCount = (userId: string | undefined) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchCount = async () => {
      try {
        const { data } = await axiosInstance.get(
          USER_COUNT_FOLLOWERS.replace("${userId}", userId)
        );

        setCount(data?.payload?.followedCount ?? 0);
      } catch (error) {
        console.error("팔로워 수를 불러올 수 없습니다.", error);
        setCount(0);
      }
    };

    fetchCount();
  }, [userId]);

  return count;
};
