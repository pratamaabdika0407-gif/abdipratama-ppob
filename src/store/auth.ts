import { create } from 'zustand';
import { IUser } from '@/types';

interface AuthStore {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null }),
}));
