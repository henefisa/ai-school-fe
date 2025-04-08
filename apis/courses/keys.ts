import { FilterCourse } from '@/apis/courses/type';

export const COURSES_KEYS = {
  course: () => 'course',
  getCourse: (id?: string) => [COURSES_KEYS.course(), id],
  listCourses: (filter: FilterCourse) => [
    COURSES_KEYS.course(),
    'listCourses',
    { ...filter },
  ],
};
