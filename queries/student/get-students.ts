import { TypedSupabaseClient } from '@/utils/types';

export enum StudentStatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const getStudents = (
  client: TypedSupabaseClient,
  options: {
    status: StudentStatusFilter;
    q: string;
  }
) => {
  const query = client
    .from('students')
    .select(`*, profiles!inner (*)`)
    .throwOnError();

  if (options.status === StudentStatusFilter.ACTIVE) {
    query.eq('status', true);
  } else if (options.status === StudentStatusFilter.INACTIVE) {
    query.eq('status', false);
  }

  if (options.q) {
    query.or(
      `first_name.ilike.%${options.q}%, last_name.ilike.%${options.q}%`,
      {
        referencedTable: 'profiles',
      }
    );
  }

  return query;
};
