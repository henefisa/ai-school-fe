import { RoomStatus, RoomType } from '@/apis/rooms/type';
import { z } from 'zod';

export const MAX_CAPACITY = 1000;
export const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const basicInfoSchema = z.object({
  name: z.string().trim().min(1, 'Room name is required'),
  roomNumber: z.string().trim().min(1, 'Room number is required'),
  building: z.string().trim().min(1, 'Building name is required'),
  capacity: z.coerce
    .number()
    .min(1, 'Capacity must be at least 1')
    .max(MAX_CAPACITY, `Capacity must be less than ${MAX_CAPACITY}`),
  roomType: z.nativeEnum(RoomType, {
    required_error: 'Room type is required',
  }),
  status: z.nativeEnum(RoomStatus, {
    required_error: 'Status is required',
  }),
  location: z.string().trim().min(1, 'Location is required'),
  description: z.string().trim().min(1, 'Description is required'),
  notes: z.string().optional(),
});

const featuresSchema = z.object({
  hasProjector: z.boolean().default(false),
  hasWhiteboard: z.boolean().default(false),
  features: z.array(z.string()).default([]),
});

const timeSlotSchema = z
  .object({
    start: z.string().regex(timeRegex, {
      message: 'Time must be in format HH:MM',
    }),
    end: z.string().regex(timeRegex, {
      message: 'Time must be in format HH:MM',
    }),
  })
  .refine(
    (data) => {
      const toMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      return toMinutes(data.start) < toMinutes(data.end);
    },
    {
      message: 'End time must be after start time',
      path: ['end'],
    }
  );

function hasOverlappingTimeSlots(
  slots: { start: string; end: string }[]
): boolean {
  if (!slots || slots.length <= 1) return false;

  const sortedSlots = [...slots].sort((a, b) => a.start.localeCompare(b.start));

  for (let i = 0; i < sortedSlots.length - 1; i++) {
    if (sortedSlots[i].end > sortedSlots[i + 1].start) {
    }
  }

  return false;
}

export const roomFormSchema = z.object({
  basicInfo: basicInfoSchema,
  featuresInfo: featuresSchema,
  operationalHours: z.object({
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
  }),
});

export type RoomFormValues = z.infer<typeof roomFormSchema>;
