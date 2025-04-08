import instance from '@/apis/instance';
import { COURSES_KEYS } from '@/apis/courses/keys';
import type { CourseResponse } from '@/apis/courses/type';
import { useQuery } from '@tanstack/react-query';

const URL = '/courses';

export const useGetCourse = (id?: string) => {
  return useQuery({
    queryKey: COURSES_KEYS.getCourse(id),
    queryFn: async () => {
      const { data } = await instance.get<CourseResponse>(`${URL}/${id}`, {
        params: {
          includeDepartment: true,
        },
      });
      return data;
    },
    enabled: !!id,
  });
};
