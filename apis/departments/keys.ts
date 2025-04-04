import { FilterCommon } from '@/types/filter-common';

export const DEPARTMENTS_KEYS = {
  department: () => 'department',
  getDepartment: (id?: string) => [DEPARTMENTS_KEYS.department(), id],
  listDepartments: (filter: FilterCommon) => [
    DEPARTMENTS_KEYS.department(),
    'listDepartments',
    { ...filter },
  ],
};
