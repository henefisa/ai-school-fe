export const flattenObjectToEntries = (
  obj: Record<string, unknown>,
  prefix = ''
): [string, unknown][] => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof File) &&
      !(value instanceof Blob)
    ) {
      return flattenObjectToEntries(value as Record<string, unknown>, newKey);
    } else {
      return [[newKey, value]];
    }
  });
};
