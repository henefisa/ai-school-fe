import { useQuery } from '@tanstack/react-query';
import instance from '../instance';
import { USER_KEYS } from './keys';
import { UserResponse } from '@/apis/users/type';

const URL = '/users/me';

export const useUserProfile = () => {
  return useQuery({
    queryKey: [USER_KEYS.userProfile],
    queryFn: async () => {
      const response = await instance.get<UserResponse>(URL);

      return response.data;
    },
    retry: false,
  });
};
