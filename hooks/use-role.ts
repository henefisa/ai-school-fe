'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getRole } from '@/queries/role/get-role';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useStoreContext } from '@/contexts/store';

export const useRole = () => {
  const role = useStoreContext((state) => state.userRole.role);
  const setRole = useStoreContext((state) => state.userRole.setRole);
  const supabase = createClient();
  const { data } = useQuery(getRole(supabase));

  useEffect(() => {
    if (data?.role) {
      setRole(data.role);
    }
  }, [data]);

  return { role, setRole };
};
