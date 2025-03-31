'use client';

import { useEffect } from 'react';
import { useStoreContext } from '@/contexts/store';
import { useUserProfile } from '@/apis/users';

export const useRole = () => {
  const role = useStoreContext((state) => state.userRole.role);
  const setRole = useStoreContext((state) => state.userRole.setRole);
  const { data } = useUserProfile();

  useEffect(() => {
    if (data?.role) {
      setRole(data.role);
    }
  }, [data]);

  return { role, setRole };
};
