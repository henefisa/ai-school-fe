import { phoneRegex } from '@/app/dashboard/students/create/schema';
import { Gender } from '@/types/profile';
import * as z from 'zod';

export const studentSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  dob: z.string().date('Invalid date'),
  gender: z.nativeEnum(Gender),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
  enrollmentDate: z.string().date('Invalid date').optional(),
  contactNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, {
      message: 'Phone number must contain only numbers and can start with +.',
    }),
});
