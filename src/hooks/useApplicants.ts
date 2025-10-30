import { useCallback, useEffect, useState } from 'react';
import {
  getApplicants,
  approveApplicant,
  rejectApplicant,
  UserProfile,
} from '../api/applicants';

export function useApplicants(projectId?: number) {
  const [list, setList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

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

  useEffect(() => { fetch(); }, [fetch]);

  const approve = useCallback(async (userId: string) => {
    if (projectId == null) return;
    setList(prev => prev.filter(u => u.id !== userId));
    try {
      await approveApplicant(projectId, userId);
    } finally {
      fetch();
    }
  }, [projectId, fetch]);

  const reject = useCallback(async (userId: string) => {
    if (projectId == null) return;
    setList(prev => prev.filter(u => u.id !== userId));
    try {
      await rejectApplicant(projectId, userId);
    } finally {
      fetch();
    }
  }, [projectId, fetch]);

  return { applicants: list, loading, error, refetch: fetch, approve, reject };
}

export default useApplicants;
