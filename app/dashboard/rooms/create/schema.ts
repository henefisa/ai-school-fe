import * as z from 'zod';
import { RoomStatus, RoomType } from '@/apis/rooms/type';

export const timeSlotSchema = z
  .object({
    start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'Time must be in format HH:MM',
    }),
    end: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'Time must be in format HH:MM',
    }),
  })
  .refine(
    (data) => {
      return data.start < data.end;
    },
    {
      message: 'End time must be after start time',
      path: ['end'],
    }
  );

export const operationalHoursSchema = z.object({
  monday: z
    .array(timeSlotSchema)
    .optional()
    .default([])
    .superRefine((slots, ctx) => {
      if (hasOverlappingTimeSlots(slots)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Time slots cannot overlap',
          path: [],
        });
      }
    }),
  tuesday: z
    .array(timeSlotSchema)
    .optional()
    .default([])
    .superRefine((slots, ctx) => {
      if (hasOverlappingTimeSlots(slots)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Time slots cannot overlap',
          path: [],
        });
      }
    }),
  wednesday: z
    .array(timeSlotSchema)
    .optional()
    .default([])
    .superRefine((slots, ctx) => {
      if (hasOverlappingTimeSlots(slots)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Time slots cannot overlap',
          path: [],
        });
      }
    }),
  thursday: z
    .array(timeSlotSchema)
    .optional()
    .default([])
    .superRefine((slots, ctx) => {
      if (hasOverlappingTimeSlots(slots)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Time slots cannot overlap',
          path: [],
        });
      }
    }),
  friday: z
    .array(timeSlotSchema)
    .optional()
    .default([])
    .superRefine((slots, ctx) => {
      if (hasOverlappingTimeSlots(slots)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Time slots cannot overlap',
          path: [],
        });
      }
    }),
  saturday: z
    .array(timeSlotSchema)
    .optional()
    .default([])
    .superRefine((slots, ctx) => {
      if (hasOverlappingTimeSlots(slots)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Time slots cannot overlap',
          path: [],
        });
      }
    }),
  sunday: z
    .array(timeSlotSchema)
    .optional()
    .default([])
    .superRefine((slots, ctx) => {
      if (hasOverlappingTimeSlots(slots)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Time slots cannot overlap',
          path: [],
        });
      }
    }),
});

function hasOverlappingTimeSlots(
  slots: { start: string; end: string }[]
): boolean {
  if (!slots || slots.length <= 1) return false;

  const sortedSlots = [...slots].sort((a, b) => a.start.localeCompare(b.start));

  for (let i = 0; i < sortedSlots.length - 1; i++) {
    if (sortedSlots[i].end > sortedSlots[i + 1].start) {
      return true;
    }
  }

  return false;
}

export const roomFormSchema = z.object({
  roomNumber: z.string().min(1, {
    message: 'Room number is required.',
  }),
  building: z.string().min(1, {
    message: 'Building name is required.',
  }),
  name: z.string().min(2, {
    message: 'Room name must be at least 2 characters.',
  }),
  capacity: z.coerce.number().min(1, {
    message: 'Capacity must be at least 1.',
  }),
  roomType: z.nativeEnum(RoomType, {
    required_error: 'Please select a room type.',
  }),
  hasProjector: z.boolean().default(false),
  hasWhiteboard: z.boolean().default(false),
  features: z.array(z.string()).default([]),
  operationalHours: operationalHoursSchema,
  status: z.nativeEnum(RoomStatus, {
    required_error: 'Please select a status.',
  }),
  location: z.string().min(1, {
    message: 'Location is required.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  notes: z.string().min(1, { message: 'Notes is required.' }),
});

export type RoomFormValues = z.infer<typeof roomFormSchema>;
