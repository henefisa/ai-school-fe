import { DepartmentResponse } from '@/apis/departments/type';

export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type SortField =
  | 'name'
  | 'code'
  | 'credits'
  | 'departmentId'
  | 'required'
  | 'status'
  | null;

export type SortOrder = 'ASC' | 'DESC' | null;

export interface FilterCourse {
  page: number;
  pageSize: number;
  name?: string;
  status: string;
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface CoursePayload {
  name: string;
  code: string;
  description: string;
  credits: number;
  required: boolean;
  departmentId: string;
  status: CourseStatus;
}

export interface CourseResponse {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  required: boolean;
  departmentId: string;
  department: DepartmentResponse;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EditCourseParams {
  id: string;
  input: Partial<CoursePayload>;
}
