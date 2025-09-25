import { create } from 'zustand';

interface FollowState {
  followMap: Record<string, boolean>;
  setFollow: (userId: string, isFollowed: boolean) => void;
  toggleFollow: (userId: string) => void;
}

export const followStore = create<FollowState>((set) => ({
  followMap: {},
  setFollow: (userId, isFollowed) =>
    set((state) => ({
      followMap: { ...state.followMap, [userId]: isFollowed },
    })),
  toggleFollow: (userId) =>
    set((state) => ({
      followMap: { ...state.followMap, [userId]: !state.followMap[userId] },
    })),
}));
