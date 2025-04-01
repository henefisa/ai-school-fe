import instance from '@/apis/instance';
import { PARENTS_KEYS } from '@/apis/parents/keys';
import type { ParentInfo } from '@/apis/parents/type';
import { useQuery } from '@tanstack/react-query';

const URL = '/parents';

export const useGetParent = (id?: string) => {
  return useQuery({
    queryKey: PARENTS_KEYS.getParent(id),
    queryFn: async () => {
      const { data } = await instance.get<ParentInfo>(`${URL}/${id}`);

      return data;
    },
    enabled: !!id,
  });
};
