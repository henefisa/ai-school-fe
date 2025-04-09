import { FilterCommon } from '@/types/filter-common';

export const TEACHERS_KEYS = {
  teacher: () => 'teacher',
  getTeacher: (id?: string) => [TEACHERS_KEYS.teacher(), id],
  listTeachers: (filter: FilterCommon) => [
    TEACHERS_KEYS.teacher(),
    'listTeachers',
    { ...filter },
  ],
};
