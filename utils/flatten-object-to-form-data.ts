import { entriesToFormData } from './entries-to-form-data';
import { flattenObjectToEntries } from './flatten-object-to-entries';

export const flattenObjectToFormData = (
  obj: Record<string, unknown>,
  options: { includeNullValues?: boolean; prefix: string } = { prefix: '' }
): FormData => {
  const { prefix, ...rest } = options;
  const flattenEntries = flattenObjectToEntries(obj, prefix);

  return entriesToFormData(flattenEntries, rest);
};
