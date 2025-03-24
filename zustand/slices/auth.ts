import { ImmerStateCreator } from '@/zustand/store';
import type { User } from '@supabase/supabase-js';

export type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const createAuthSlice: ImmerStateCreator<AuthState> = (set) => {
  return {
    user: null,
    setUser: (user) =>
      set((state) => {
        state.auth.user = user;
      }),
  };
};
