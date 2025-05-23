import { Address } from '@/apis/students/type';
import type { UserResponse } from '@/apis/users/type';

export interface EmergencyContactPayload {
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
}

export interface ParentPayload {
  personal: {
    firstName: string;
    lastName: string;
    occupation: string;
    username: string;
    password: string;
  };
  contact: {
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContacts: EmergencyContactPayload[];
  notes?: string;
}

export interface ParentResponse {
  id: string;
  personal: {
    firstName: string;
    lastName: string;
    occupation: string;
  };
  contact: {
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContacts: EmergencyContactResponse[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EmergencyContactResponse {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EditParentParams {
  id: string;
  input: Partial<ParentPayload>;
}

export interface ParentAddresses {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  parentId: string;
  addressId: string;
  addressType: string;
  address: Address;
}

export interface ParentInfo {
  id: string;
  firstName: string;
  lastName: string;
  relationshipToStudent: string;
  contactNumber1: string;
  contactNumber2: string | null;
  email: string;
  occupation: string;
  notes: string;
  emergencyContacts: EmergencyContactResponse[];
  parentAddresses: ParentAddresses[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: UserResponse;
}
