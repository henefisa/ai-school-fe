import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { ParentPayload, ParentResponse } from '@/apis/parents/type';
import type { QueryContext } from '@/types/query';

const URL = '/parents';

export const useCreateParent = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ParentPayload) => {
      const { data } = await instance.post<ParentResponse>(URL, input);

      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
