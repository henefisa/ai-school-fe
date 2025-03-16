'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import { Tables } from '@/utils/supabase/database.types';
import { createClient } from '@/utils/supabase/client';

export const useProfile = () => {
  const supabase = createClient();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        setProfile(null);

        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return;
      }

      setProfile(data);
    };

    getProfile();
  }, [user]);

  return {
    profile,
  };
};
