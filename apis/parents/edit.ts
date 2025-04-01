import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { EditParentParams, ParentResponse } from '@/apis/parents/type';
import type { QueryContext } from '@/types/query';

const URL = '/parents';

export const useEditParent = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditParentParams) => {
      const { data } = await instance.patch<ParentResponse>(
        `${URL}/${id}`,
        input,
        {}
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
