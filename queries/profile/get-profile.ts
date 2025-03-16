import { TypedSupabaseClient } from '@/utils/types';

export const getProfile = (client: TypedSupabaseClient) => {
  return client.from('profiles').select('*').throwOnError().single();
};
