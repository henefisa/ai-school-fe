import { Gender } from '@/types/profile';
import { z } from 'zod';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

const personalSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  dob: z.string().date('Invalid date'),
  gender: z.nativeEnum(Gender),
  studentId: z.string().optional(),
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().trim().min(1, 'Password is required'),
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
});

const contactSchema = z.object({
  street: z.string().trim().min(1, 'Street address is required'),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().trim().min(1, 'State/Province is required'),
  zipCode: z.string().trim().min(1, 'Zip code is required'),
  country: z.string().trim().min(1, 'Country is required'),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, {
      message: 'Phone number must contain only numbers and can start with +.',
    }),
});

const academicSchema = z.object({
  grade: z.string().trim().min(1, 'Grade is required'),
  enrollmentDate: z.string().date('Invalid date').optional(),
  previousSchool: z.string().optional(),
  academicYear: z.string().trim().min(1, 'Academic year is required'),
  additionalNotes: z.string().optional(),
});

const parentSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  relationship: z.string().trim().min(1, 'Relationship is required'),
  email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, {
      message: 'Phone number must contain only numbers and can start with +.',
    }),
  address: z.string().trim().min(1, 'Address is required'),
  emergencyContact: z.string().trim().min(1, 'Emergency contact is required'),
  parentId: z.string().optional(),
});

export const formSchema = z.object({
  personal: personalSchema,
  contact: contactSchema,
  academic: academicSchema,
  parent: z.object({
    parentId: z.string().min(1, 'Parent is required'),
  }),
});
