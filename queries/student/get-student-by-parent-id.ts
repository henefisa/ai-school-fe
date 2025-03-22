import { TypedSupabaseClient } from '@/utils/types';

export const getStudentByParentId = (
  client: TypedSupabaseClient,
  id: string
) => {
  return client
    .from('parents')
    .select('*, students(*, profiles!inner(*))')
    .eq('profile_id', id)
    .throwOnError()
    .single();
};
