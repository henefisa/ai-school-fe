import type { FilterRoom } from '@/apis/rooms/type';

export const ROOMS_KEYS = {
  room: () => 'room',
  getRoom: (id?: string) => [ROOMS_KEYS.room(), id],
  listRooms: (filter: FilterRoom) => [ROOMS_KEYS.room(), 'listRooms', filter],
};
