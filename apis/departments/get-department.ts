import instance from '@/apis/instance';
import { DEPARTMENTS_KEYS } from '@/apis/departments/keys';
import type { DepartmentResponse } from '@/apis/departments/type';
import { useQuery } from '@tanstack/react-query';

const URL = '/departments';

export const useGetDepartment = (id?: string) => {
  return useQuery({
    queryKey: DEPARTMENTS_KEYS.getDepartment(id),
    queryFn: async () => {
      const { data } = await instance.get<DepartmentResponse>(`${URL}/${id}`, {
        params: {
          includeHead: true,
        },
      });
      return data;
    },
    enabled: !!id,
  });
};
