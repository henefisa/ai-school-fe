import { TypedSupabaseClient } from '@/utils/types';

export const getRole = (client: TypedSupabaseClient) => {
  return client.from('user_roles').select('*').throwOnError().single();
};
