export const parseNestedEntries = (
  entries: [string, unknown][]
): Record<string, unknown> => {
  const result: Record<string, Record<string, unknown> | unknown> = {};

  entries.forEach(([key, value]) => {
    if (key.includes('.')) {
      const [prefix, field] = key.split('.');

      // Initialize nested object if it doesn't exist
      if (!result[prefix] || typeof result[prefix] !== 'object') {
        result[prefix] = {};
      }

      // Set the field in the nested object
      (result[prefix] as Record<string, unknown>)[field] = value;
    } else {
      // Handle non-nested properties
      result[key] = value;
    }
  });

  return result;
};
