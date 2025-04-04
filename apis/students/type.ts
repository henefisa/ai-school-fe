import { UserResponse } from '@/apis/users/type';
import { Gender } from '@/types/profile';

export interface StudentPayload {
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender;
  contactNumber: string;
  email: string;
  enrollmentDate: string;
}

export interface StudentResponse extends StudentPayload {
  id: string;
  parentId: string;
  grade: string;
  previousSchool: string;
  academicYear: string;
  additionalNotes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EditStudentParams {
  id: string;
  input: StudentPayload;
}

export interface StudentInfo extends StudentResponse {
  user: UserResponse;
}
