import { FilterCommon } from '@/types/filter-common';

export const PARENTS_KEYS = {
  parent: () => 'parent',
  getParent: (id?: string) => [PARENTS_KEYS.parent(), id],
  listParents: (filter: FilterCommon) => [
    PARENTS_KEYS.parent(),
    'listParents',
    filter,
  ],
};
