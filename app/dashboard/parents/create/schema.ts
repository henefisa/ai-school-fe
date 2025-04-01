import * as z from 'zod';

export const formSchema = z.object({
  personal: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    occupation: z.string().optional(),
  }),
  contact: z.object({
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  emergencyContacts: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        relationship: z.string().min(1, 'Relationship is required'),
        phoneNumber: z.string().min(1, 'Phone number is required'),
        email: z.string().email('Invalid email address'),
      })
    )
    .min(1, 'At least one emergency contact is required'),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
  createStudentAfter: z.boolean().default(false),
});
