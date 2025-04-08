import instance from '@/apis/instance';
import { DEPARTMENTS_KEYS } from '@/apis/departments/keys';
import type { DepartmentResponse } from '@/apis/departments/type';
import type { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';
import { FilterCommon } from '@/types/filter-common';

const URL = '/departments';

export enum DepartmentStatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const useListDepartments = (filter: FilterCommon) => {
  return useQuery({
    queryKey: DEPARTMENTS_KEYS.listDepartments(filter),
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<DepartmentResponse>>(
        URL,
        {
          params: {
            ...filter,
            includeHead: true,
          },
        }
      );
      return data;
    },
  });
};
