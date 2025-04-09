import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { CoursePayload, CourseResponse } from '@/apis/courses/type';
import type { QueryContext } from '@/types/query';

const URL = '/courses';

export const useCreateCourse = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CoursePayload) => {
      const { data } = await instance.post<CourseResponse>(URL, input);
      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
