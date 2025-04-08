import instance from '@/apis/instance';
import { COURSES_KEYS } from '@/apis/courses/keys';
import type { CourseResponse, FilterCourse } from '@/apis/courses/type';
import type { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';

const URL = '/courses';

export enum CourseStatusFilter {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const useListCourses = (filter: FilterCourse) => {
  return useQuery({
    queryKey: COURSES_KEYS.listCourses(filter),
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<CourseResponse>>(URL, {
        params: {
          ...filter,
          includeDepartment: true,
        },
      });
      return data;
    },
  });
};
