import { useMutation } from '@tanstack/react-query';
import instance from '../instance';
import { LoginResponse } from '@/apis/auth/login';
import { Role } from '@/types/role';

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

const URL = '/auth/register';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await instance.post<LoginResponse>(URL, input);

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return response.data;
    },
  });
};
