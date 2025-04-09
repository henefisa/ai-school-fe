import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { EditRoomParams, RoomResponse } from '@/apis/rooms/type';
import type { QueryContext } from '@/types/query';

const URL = '/rooms';

export const useEditRoom = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditRoomParams) => {
      const { data } = await instance.patch<RoomResponse>(
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
