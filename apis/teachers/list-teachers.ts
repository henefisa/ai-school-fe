import instance from '@/apis/instance';
import { TEACHERS_KEYS } from '@/apis/teachers/keys';
import type { TeacherInfo } from '@/apis/teachers/type';
import { FilterCommon } from '@/types/filter-common';
import type { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';

const URL = '/teachers';

export const useListTeachers = (filter: FilterCommon) => {
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
