import instance from '@/apis/instance';
import { STUDENTS_KEYS } from '@/apis/students/keys';
import { StudentInfo } from '@/apis/students/type';
import { useQuery } from '@tanstack/react-query';

const URL = '/students';

export const useGetStudent = (id?: string) => {
  return useQuery({
    queryKey: STUDENTS_KEYS.getStudent(id),
    queryFn: async () => {
      const { data } = await instance.get<StudentInfo>(`${URL}/${id}`);

      return data;
    },

    enabled: !!id,
  });
};
