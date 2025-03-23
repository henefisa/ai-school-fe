'use client';

import { getRole } from '@/queries/role/get-role';
import { type RoleStore, createRoleStore } from '@/stores/role-store';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import React, {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from 'react';
import { useStore } from 'zustand';

export type RoleStoreApi = ReturnType<typeof createRoleStore>;

export const RoleStoreContext = createContext<RoleStoreApi | undefined>(
  undefined
);

export const RoleContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const supabase = createClient();
  const { data } = useQuery(getRole(supabase));

  const storeRef = useRef<RoleStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createRoleStore();
  }

  useEffect(() => {
    if (data?.role) {
      storeRef.current?.getState().setRole({
        id: data.id,
        role: data.role,
        userId: data.user_id,
      });
    }
  }, [data]);

  return (
    <RoleStoreContext.Provider value={storeRef.current}>
      {children}
    </RoleStoreContext.Provider>
  );
};

export const useRoleStore = <T,>(selector: (store: RoleStore) => T): T => {
  const roleStoreContext = useContext(RoleStoreContext);

  if (!roleStoreContext) {
    throw new Error(`useRoleStore must be used within RoleStoreProvider`);
  }

  return useStore(roleStoreContext, selector);
};
