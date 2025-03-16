'use client';

import { useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
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
