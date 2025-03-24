'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useStoreContext } from '@/contexts/store';

export const useAuth = () => {
  const user = useStoreContext((state) => state.auth.user);
  const setUser = useStoreContext((state) => state.auth.setUser);

  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) {
        return;
      }

      setUser(user);
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return { user, logout };
};
