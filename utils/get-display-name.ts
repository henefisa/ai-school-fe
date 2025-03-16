import { Tables } from './supabase/database.types';

export const getDisplayName = (
  profile: Tables<'profiles'> | null | undefined
) => {
  if (!profile) {
    return '';
  }

  return `${profile.first_name} ${profile.last_name}`;
};
