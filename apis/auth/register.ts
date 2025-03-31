import { useMutation } from '@tanstack/react-query';
import instance from '../instance';
import { Role } from '@/types/role';

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface RegisterResponse {}

const URL = '/auth/register';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await instance.post<RegisterResponse>(URL, input);

      return response.data;
    },
  });
};
