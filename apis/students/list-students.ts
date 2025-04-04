import instance from '@/apis/instance';
import { STUDENTS_KEYS } from '@/apis/students/keys';
import { StudentInfo } from '@/apis/students/type';
import { FilterCommon } from '@/types/filter-common';
import { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';

const URL = '/students';

export enum StudentStatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const useListStudents = (filter: FilterCommon) => {
  return useQuery({
    queryKey: STUDENTS_KEYS.listStudents(filter),
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<StudentInfo>>(URL, {
        params: filter,
      });

      return data;
    },
  });
};
