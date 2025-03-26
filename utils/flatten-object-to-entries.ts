export const flattenObjectToEntries = (
  obj: Record<string, unknown>,
  prefix = ''
): [string, unknown][] => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    console.log('typeof', value instanceof File);

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      return flattenObjectToEntries(value as Record<string, unknown>, newKey);
    } else {
      // Base case: return the key-value pair
      return [[newKey, value]];
    }
  });
};
