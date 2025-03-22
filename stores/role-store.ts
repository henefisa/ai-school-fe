import { createStore } from 'zustand/vanilla';

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT' | 'STAFF';

export type RoleState = {
  id: number;
  role: Role;
  userId: string;
};

export type RoleActions = {
  setRole: (newRole: RoleState) => void;
};

export type RoleStore = RoleState & RoleActions;

export const createRoleStore = (initState: Partial<RoleState> = {}) => {
  return createStore<RoleStore>()((set) => ({
    id: initState.id || 1,
    role: initState.role || 'STUDENT',
    userId: initState.userId || '',

    setRole: (data: RoleState) => {
      set(() => data);
    },
  }));
};
