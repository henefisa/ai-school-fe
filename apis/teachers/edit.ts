import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { EditTeacherParams, TeacherResponse } from '@/apis/teachers/type';
import type { QueryContext } from '@/types/query';
import { flattenObjectToFormData } from '@/utils/flatten-object-to-form-data';

const URL = '/teachers';

export const useEditTeacher = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditTeacherParams) => {
      const formData = flattenObjectToFormData(input);

      const { data } = await instance.patch<TeacherResponse>(
        `${URL}/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
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
