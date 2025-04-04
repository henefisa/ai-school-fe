export interface DepartmentPayload {
  name: string;
  code: string;
  headId: string;
  description: string;
  location: string;
  email: string;
  phoneNumber: string;
}

export interface DepartmentResponse extends DepartmentPayload {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EditDepartmentParams {
  id: string;
  input: Partial<DepartmentPayload>;
}
