import instance from '@/apis/instance';
import { PARENTS_KEYS } from '@/apis/parents/keys';
import type { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';
import type { StudentInfo } from '@/apis/students/type';

const URL = '/parents';

export const useGetParentChildren = (parentId?: string) => {
  return useQuery({
    queryKey: [...PARENTS_KEYS.getParent(parentId), 'children'],
    queryFn: async () => {
      const { data } = await instance.get<StudentInfo[]>(
        `${URL}/${parentId}/children`
      );

      return data;
    },
    enabled: !!parentId,
  });
};
