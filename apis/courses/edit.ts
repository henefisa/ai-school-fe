import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { EditCourseParams, CourseResponse } from '@/apis/courses/type';
import type { QueryContext } from '@/types/query';

const URL = '/courses';

export const useEditCourse = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditCourseParams) => {
      const { data } = await instance.patch<CourseResponse>(
        `${URL}/${id}`,
        input
      );
      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
