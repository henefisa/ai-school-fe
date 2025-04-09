import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { RoomPayload, RoomResponse } from '@/apis/rooms/type';
import type { QueryContext } from '@/types/query';

const URL = '/rooms';

export const useCreateRoom = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RoomPayload) => {
      const { data } = await instance.post<RoomResponse>(URL, input);
      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
