import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { TeacherResponse } from '@/apis/teachers/type';
import type { QueryContext } from '@/types/query';
import { flattenObjectToFormData } from '@/utils/flatten-object-to-form-data';
import { formSchema } from '@/app/dashboard/teachers/create/schema';
import * as z from 'zod';

const URL = '/teachers';

export const useCreateTeacher = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof formSchema>) => {
      const formData = flattenObjectToFormData(input);

      const { data } = await instance.post<TeacherResponse>(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
