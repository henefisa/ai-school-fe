import instance from '@/apis/instance';
import { PARENTS_KEYS } from '@/apis/parents/keys';
import type { ParentInfo } from '@/apis/parents/type';
import { FilterStudent as FilterParent } from '@/apis/students/type';
import type { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';

const URL = '/parents';

export enum ParentStatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const useListParents = (filter: FilterParent) => {
  return useQuery({
    queryKey: PARENTS_KEYS.listParents(filter),
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<ParentInfo>>(URL, {
        params: filter,
      });

      return data;
    },
  });
};
