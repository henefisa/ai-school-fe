import { ImmerStateCreator } from '@/zustand/store';

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'STAFF';

export type RoleState = {
  role: Role | null;
  setRole: (newRole: Role) => void;
};

export const createUserRoleSlice: ImmerStateCreator<RoleState> = (set) => ({
  role: null,
  setRole: (role: Role) =>
    set((state) => {
      state.userRole.role = role;
    }),
});
