'use client';

import { StateCreator, StoreApi, createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useRef } from 'react';
import { persist, createJSONStorage } from 'zustand/middleware';
import merge from 'lodash.merge';
import { createUserRoleSlice, RoleState } from '@/zustand/slices/user-role';
import { AuthState, createAuthSlice } from '@/zustand/slices/auth';
import { StorageContext } from '@/contexts/store';

export type CommonState = {
  userRole: RoleState;
  auth: AuthState;
};

export type ImmerStateCreator<T> = StateCreator<
  CommonState,
  [['zustand/immer', never]],
  [],
  T
>;

const PERSIST_KEY = 'store-persist-key';

export const StoreProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const storeRef = useRef<StoreApi<CommonState> | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createStore<CommonState>()(
      persist(
        immer(
          devtools((...args) => ({
            auth: createAuthSlice(...args),
            userRole: createUserRoleSlice(...args),
          }))
        ),
        {
          name: PERSIST_KEY,
          storage: createJSONStorage(() => localStorage),
          merge(persistedState, currentState) {
            return merge({}, currentState, persistedState);
          },
        }
      )
    );
  }

  return (
    <StorageContext.Provider value={storeRef.current!}>
      {children}
    </StorageContext.Provider>
  );
};
