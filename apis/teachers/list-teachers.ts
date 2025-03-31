import instance from '@/apis/instance';
import { FilterStudent as FilterTeacher } from '@/apis/students/type';
import { TEACHERS_KEYS } from '@/apis/teachers/keys';
import type { TeacherInfo } from '@/apis/teachers/type';
import type { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';

const URL = '/teachers';

export const useListTeachers = (filter: FilterTeacher) => {
  return useQuery({
    queryKey: TEACHERS_KEYS.listTeachers(filter),
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<TeacherInfo>>(URL, {
        params: filter,
      });

      return data;
    },
  });
};
