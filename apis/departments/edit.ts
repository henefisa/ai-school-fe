import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type {
  EditDepartmentParams,
  DepartmentResponse,
} from '@/apis/departments/type';
import type { QueryContext } from '@/types/query';

const URL = '/departments';

export const useEditDepartment = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditDepartmentParams) => {
      const { data } = await instance.patch<DepartmentResponse>(
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
