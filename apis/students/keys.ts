import { FilterCommon } from '@/types/filter-common';

export const STUDENTS_KEYS = {
  student: () => 'student',
  getStudent: (id?: string) => [STUDENTS_KEYS.student(), id],
  listStudents: (filter: FilterCommon) => [
    STUDENTS_KEYS.student(),
    'listStudents',
    { ...filter },
  ],
};
