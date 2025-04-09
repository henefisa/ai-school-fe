import instance from '@/apis/instance';
import { ROOMS_KEYS } from '@/apis/rooms/keys';
import type { RoomResponse } from '@/apis/rooms/type';
import { useQuery } from '@tanstack/react-query';

const URL = '/rooms';

export const useGetRoom = (id?: string) => {
  return useQuery({
    queryKey: ROOMS_KEYS.getRoom(id),
    queryFn: async () => {
      const { data } = await instance.get<RoomResponse>(`${URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
