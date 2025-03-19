import { TypedSupabaseClient } from '@/utils/types';

export const getProfileById = (client: TypedSupabaseClient, id: string) => {
  return client
    .from('profiles')
    .select('*')
    .eq('id', id)
    .throwOnError()
    .single();
};
