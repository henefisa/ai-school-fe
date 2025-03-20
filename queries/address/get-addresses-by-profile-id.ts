import { TypedSupabaseClient } from '@/utils/types';

export const getAddressesByProfileId = (
  client: TypedSupabaseClient,
  profileId: string
) => {
  return client
    .from('addresses')
    .select('*')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false });
};
