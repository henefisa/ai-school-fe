export enum RoomType {
  CLASS_ROOM = 'CLASS_ROOM',
  LAB = 'LAB',
  OFFICE = 'OFFICE',
  AUDITORIUM = 'AUDITORIUM',
  OTHER = 'OTHER',
}

export enum RoomStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  INACTIVE = 'INACTIVE',
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface OperationalHours {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface FilterRoom {
  page: number;
  pageSize: number;
  name: string;
  status?: RoomStatus;
}

export interface RoomPayload {
  roomNumber: string;
  building: string;
  name: string;
  capacity: number;
  roomType: RoomType;
  hasProjector: boolean;
  hasWhiteboard: boolean;
  features: string[];
  operationalHours: OperationalHours;
  status: RoomStatus;
  location: string;
  description: string;
  notes?: string;
}

export interface RoomResponse extends RoomPayload {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EditRoomParams {
  id: string;
  input: Partial<RoomPayload>;
}
