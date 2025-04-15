import instance from '@/apis/instance';
import { STUDENTS_KEYS } from '@/apis/students/keys';
import { StudentDetail } from '@/apis/students/type';
import { useQuery } from '@tanstack/react-query';

const URL = '/students';

export const useGetStudent = (id?: string) => {
  return useQuery({
    queryKey: STUDENTS_KEYS.getStudent(id),
    queryFn: async () => {
      const { data } = await instance.get<StudentDetail>(`${URL}/${id}`, {
        params: {
          includeParent: true,
          includeUser: true,
          includeAddresses: true,
        },
      });

      return data;
    },

    enabled: !!id,
  });
};
