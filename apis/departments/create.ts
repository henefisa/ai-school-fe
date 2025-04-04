import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type {
  DepartmentPayload,
  DepartmentResponse,
} from '@/apis/departments/type';
import type { QueryContext } from '@/types/query';

const URL = '/departments';

export const useCreateDepartment = ({
  queryKey,
}: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: DepartmentPayload) => {
      const { data } = await instance.post<DepartmentResponse>(URL, input);
      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
