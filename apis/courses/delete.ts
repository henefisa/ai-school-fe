import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { QueryContext } from '@/types/query';

const URL = '/courses';

export const useDeleteCourse = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await instance.delete(`${URL}/${id}`);
      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
