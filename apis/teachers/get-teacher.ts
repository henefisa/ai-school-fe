import instance from '@/apis/instance';
import { TEACHERS_KEYS } from '@/apis/teachers/keys';
import type { TeacherDetail } from '@/apis/teachers/type';
import { useQuery } from '@tanstack/react-query';

const URL = '/teachers';

export const useGetTeacher = (id?: string) => {
  return useQuery({
    queryKey: TEACHERS_KEYS.getTeacher(id),
    queryFn: async () => {
      const { data } = await instance.get<TeacherDetail>(`${URL}/${id}`, {
        params: {
          includeDepartments: true,
          includeUser: true,
          includeTeacherAddresses: true,
        },
      });

      return data;
    },
    enabled: !!id,
  });
};
