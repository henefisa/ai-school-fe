import { DepartmentResponse } from '@/apis/departments/type';
import type { UserResponse } from '@/apis/users/type';
import { formSchema } from '@/app/dashboard/teachers/create/schema';
import type { Gender } from '@/types/profile';
import * as z from 'zod';

export interface TeacherResponse {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  hireDate: string;
  salary: number | null;
  gender: Gender;
  contactNumber: string;
  email: string;
  departmentId: string;
  departments: DepartmentResponse[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EditTeacherParams {
  id: string;
  input: Partial<z.infer<typeof formSchema>>;
}

export interface TeacherInfo extends TeacherResponse {
  user: UserResponse;
}
