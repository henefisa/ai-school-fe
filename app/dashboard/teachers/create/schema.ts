import { z } from 'zod';
import { Gender } from '@/types/profile';
import { MAX_FILE_SIZE } from '@/app/dashboard/students/create/schema';
import { EmploymentType } from '@/types/employment-type';
import { TitleType } from '@/types/title';

export const formSchema = z.object({
  personal: z.object({
    title: z.nativeEnum(TitleType),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dob: z.string().date('Invalid date'),
    gender: z.nativeEnum(Gender),
    employeeId: z.string().min(1, 'EmployeeId is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    photo: z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        (file) => ({
          message: `File size must be less than 5MB, got ${(
            file.size /
            (1024 * 1024)
          ).toFixed(2)}MB`,
        })
      )
      .optional(),
  }),
  contact: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State/Province is required'),
    zipCode: z.string().min(1, 'Postal/Zip code is required'),
    country: z.string().min(1, 'Country is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    emergencyContact: z.string().min(1, 'Emergency contact is required'),
  }),
  professional: z.object({
    departmentId: z.string().min(1, 'Department is required'),
    position: z.string().min(1, 'Position is required'),
    joinDate: z.string().date('Invalid date'),
    employmentType: z.nativeEnum(EmploymentType),
    qualification: z.string().min(1, 'Qualification is required'),
    experience: z.string().min(1, 'Experience is required'),
    specialization: z.string().min(1, 'Specialization is required'),
  }),
});
