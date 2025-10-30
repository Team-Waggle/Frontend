import { useCallback, useEffect, useState } from 'react';
import { getMembers, kickMember, UserProfile } from '../api/members';

export function useMembers(projectId?: number) {
  const [list, setList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (projectId == null) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getMembers(projectId);
      setList(data);
    } catch (e: any) {
      setError(e?.message ?? 'unknown error');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => { fetch(); }, [fetch]);

  const kick = useCallback(async (userId: string) => {
    if (projectId == null) return;
    setList(prev => prev.filter(u => u.id !== userId));
    try {
      await kickMember(projectId, userId);
    } finally {
      fetch();
    }
  }, [projectId, fetch]);

  return { members: list, loading, error, refetch: fetch, kick };
}

export default useMembers;
