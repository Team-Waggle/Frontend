import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage', // localStorage key
    },
  ),
);

// accessToken cookie로 변경되면 아래로 변경할 것
// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: null,
//   setAccessToken: (token) => set({ accessToken: token }),
//   clearAccessToken: () => set({ accessToken: null }),
// }));
