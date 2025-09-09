import { create } from 'zustand';
import type { UserMePayload } from '../types/user';

interface UserState {
  user: UserMePayload | null;
  setUser: (user: UserMePayload) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));