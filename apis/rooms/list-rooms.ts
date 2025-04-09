import instance from '@/apis/instance';
import { ROOMS_KEYS } from '@/apis/rooms/keys';
import type { FilterRoom, RoomResponse } from '@/apis/rooms/type';
import type { ListResponse } from '@/types/list-response';
import { useQuery } from '@tanstack/react-query';

const URL = '/rooms';

export const useListRooms = (filter: FilterRoom) => {
  return useQuery({
    queryKey: ROOMS_KEYS.listRooms(filter),
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<RoomResponse>>(URL, {
        params: filter,
      });
      return data;
    },
  });
};
