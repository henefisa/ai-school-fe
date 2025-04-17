import { Gender } from '@/types/profile';
import { Role } from '@/types/role';

export interface UploadAvatarPayload {
  avatar: File;
}

export interface UserResponse {
  id: string;
  username: string;
  role: Role;
  photoUrl: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dob: string | null;
  gender: Gender | null;
  phoneNumber: string | null;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
