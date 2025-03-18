import { TypedSupabaseClient } from '@/utils/types';

export const getStudents = (client: TypedSupabaseClient) => {
  return client.from('students').select(`*, profiles(*)`).throwOnError();
};
