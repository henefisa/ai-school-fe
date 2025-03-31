import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import { StudentResponse } from '@/apis/students/type';
import { QueryContext } from '@/types/query';

const URL = '/students';

export const useDeleteStudent = ({ queryKey }: Partial<QueryContext> = {}) => {
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
