import { useCallback, useEffect, useState } from 'react';
import {
  getApplicants,
  approveApplicant,
  rejectApplicant,
  UserProfile,
  getMyApply,
  postApply,
} from '../api/applicants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useApplicants(projectId?: number) {
  const [list, setList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (projectId == null) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getApplicants(projectId);
      setList(data);
    } catch (e: any) {
      setError(e?.message ?? 'unknown error');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const approve = useCallback(
    async (userId: string) => {
      if (projectId == null) return;
      setList((prev) => prev.filter((u) => u.id !== userId));
      try {
        await approveApplicant(projectId, userId);
      } finally {
        fetch();
      }
    },
    [projectId, fetch],
  );

  const reject = useCallback(
    async (userId: string) => {
      if (projectId == null) return;
      setList((prev) => prev.filter((u) => u.id !== userId));
      try {
        await rejectApplicant(projectId, userId);
      } finally {
        fetch();
      }
    },
    [projectId, fetch],
  );

  return { applicants: list, loading, error, refetch: fetch, approve, reject };
}

export default useApplicants;

// 프로젝트 지원

export const usePostApply = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (position: string) => postApply(projectId, position),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postApply', projectId] });
    },
    onError: (error) => {
      console.error('Error Apply:', error);
    },
  });
};

// 내가 지원한 프로젝트 조회

export const useGetMyApply = (status?: string) => {
  return useQuery({
    queryKey: ['getMyApply', status],
    queryFn: () => getMyApply(status),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
  });
};
