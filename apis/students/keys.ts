import { FilterStudent } from '@/apis/students/type';

export const STUDENTS_KEYS = {
  student: () => 'student',
  getStudent: (id?: string) => [STUDENTS_KEYS.student(), id],
  listStudents: (filter: FilterStudent) => [
    STUDENTS_KEYS.student(),
    'listStudents',
    { ...filter },
  ],
};
