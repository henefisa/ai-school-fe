import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../instance';
import type { QueryContext } from '@/types/query';
import { UploadAvatarPayload, UserResponse } from '@/apis/users/type';

const URL = '/users/avatar';

export const useUpdateAvatar = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UploadAvatarPayload) => {
      const formData = new FormData();
      formData.append('avatar', payload.avatar);

      const { data } = await instance.post<UserResponse>(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
