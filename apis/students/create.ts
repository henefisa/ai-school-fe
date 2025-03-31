import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import { StudentResponse } from '@/apis/students/type';
import { QueryContext } from '@/types/query';
import { flattenObjectToFormData } from '@/utils/flatten-object-to-form-data';
import { formSchema } from '@/app/dashboard/students/create/schema';
import * as z from 'zod';

const URL = '/students';

export const useCreateStudent = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: z.infer<typeof formSchema>) => {
      const formData = flattenObjectToFormData(input);

      const { data } = await instance.post<StudentResponse>(URL, formData, {
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
