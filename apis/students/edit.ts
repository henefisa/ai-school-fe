import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import { EditStudentParams, StudentResponse } from '@/apis/students/type';
import { QueryContext } from '@/types/query';

const URL = '/students';

export const useEditStudent = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditStudentParams) => {
      const { data } = await instance.patch<StudentResponse>(
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
