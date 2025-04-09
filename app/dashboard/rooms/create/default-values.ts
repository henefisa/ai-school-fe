import { RoomStatus, RoomType, type OperationalHours } from '@/apis/rooms/type';
import type { RoomFormValues } from './schema';

export const defaultOperationalHours: OperationalHours = {
  monday: [
    { start: '08:00', end: '12:00' },
    { start: '13:00', end: '17:00' },
  ],
  tuesday: [
    { start: '08:00', end: '12:00' },
    { start: '13:00', end: '17:00' },
  ],
  wednesday: [
    { start: '08:00', end: '12:00' },
    { start: '13:00', end: '17:00' },
  ],
  thursday: [
    { start: '08:00', end: '12:00' },
    { start: '13:00', end: '17:00' },
  ],
  friday: [
    { start: '08:00', end: '12:00' },
    { start: '13:00', end: '17:00' },
  ],
  saturday: [{ start: '08:00', end: '12:00' }],
  sunday: [],
};

export const defaultFormValues: RoomFormValues = {
  basicInfo: {
    roomNumber: '',
    building: '',
    name: '',
    capacity: 0,
    roomType: RoomType.CLASS_ROOM,
    status: RoomStatus.ACTIVE,
    location: '',
    description: '',
    notes: '',
  },
  featuresInfo: {
    hasProjector: false,
    hasWhiteboard: false,
    features: [],
  },
  operationalHours: defaultOperationalHours,
};
