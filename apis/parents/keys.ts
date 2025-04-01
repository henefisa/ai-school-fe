import { FilterStudent as FilterParent } from '@/apis/students/type';

export const PARENTS_KEYS = {
  parent: () => 'parent',
  getParent: (id?: string) => [PARENTS_KEYS.parent(), id],
  listParents: (filter: FilterParent) => [
    PARENTS_KEYS.parent(),
    'listParents',
    { ...filter },
  ],
};
