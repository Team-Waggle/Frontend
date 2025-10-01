import { create } from 'zustand';
import type { UserMePayload } from '../types/user';

interface UserState {
  user: UserMePayload | null;
  loading: boolean;
  setUser: (user: UserMePayload) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setLoading: (loading) => set({ loading }),
}));