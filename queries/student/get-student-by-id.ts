import { TypedSupabaseClient } from '@/utils/types';

export const getStudentById = (client: TypedSupabaseClient, id: string) => {
  return client
    .from('students')
    .select(`*, profiles!inner (*), parents!inner (*, profiles!inner (*))`)
    .eq('id', id)
    .throwOnError()
    .single();
};
