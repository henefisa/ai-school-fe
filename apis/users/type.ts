import { Role } from '@/types/role';

export interface UserPayload {
  username: string;
  email: string;
  role: Role;
  teacherId: string | null;
  studentId: string | null;
  isActive: boolean;
  photoUrl: string | null;
}

export interface UserResponse extends UserPayload {
  id: string;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
