import { create } from 'zustand';

interface FilterStore {
  filters: Record<string, string[]>;
  tags: string[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setFilters: (newFilters: Record<string, string[]>, newTags: string[]) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  tags: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setFilters: (newFilters, newTags) =>
    set({ filters: newFilters, tags: newTags }),
  reset: () => set({ filters: {}, tags: [] }),
}));
