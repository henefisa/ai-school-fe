import { FilterStudent as FilterTeacher } from '@/apis/students/type';

export const TEACHERS_KEYS = {
  teacher: () => 'teacher',
  getTeacher: (id?: string) => [TEACHERS_KEYS.teacher(), id],
  listTeachers: (filter: FilterTeacher) => [
    TEACHERS_KEYS.teacher(),
    'listTeachers',
    { ...filter },
  ],
};
