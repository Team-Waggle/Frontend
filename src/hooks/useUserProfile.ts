import { useCallback, useState, useEffect } from 'react';
import { useUser } from './useUser';
import { getUserById } from '../api/user';
import type { UserMePayload } from '../types/user';

export function useUserProfile(profileUserId?: string) {
  const { user: me, fetchUser } = useUser();
  const [profile, setProfile] = useState<UserMePayload | null>(null);
  const [loading, setLoading] = useState(true);

  const isMyProfile = !profileUserId || me?.id === profileUserId;

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      if (isMyProfile) {
        const updated = await fetchUser();
        setProfile(updated);
      } else if (profileUserId) {
        const res = await getUserById(profileUserId);
        if (res.success) setProfile(res.payload);
      }
    } finally {
      setLoading(false);
    }
  }, [profileUserId, isMyProfile, fetchUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isMyProfile, loading };
}