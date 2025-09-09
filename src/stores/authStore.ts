import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AccessTokenState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

interface RefreshTokenState {
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
  clearRefreshToken: () => void;
}

export const useAccessTokenStore = create<AccessTokenState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'access-token-storage', // sessionStorage key
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useRefreshTokenStore = create<RefreshTokenState>()(
  persist(
    (set) => ({
      refreshToken: null,
      setRefreshToken: (token) => set({ refreshToken: token }),
      clearRefreshToken: () => set({ refreshToken: null }),
    }),
    {
      name: 'refresh-token-storage', // localStorage key
    },
  ),
);

// accessToken cookie로 변경되면 아래로 변경할 것
// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: null,
//   setAccessToken: (token) => set({ accessToken: token }),
//   clearAccessToken: () => set({ accessToken: null }),
// }));

