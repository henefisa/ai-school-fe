export function entriesToFormData(
  entries: [string, unknown][],
  options: { includeNullValues?: boolean } = {}
): FormData {
  const formData = new FormData();

  entries.forEach(([key, value]) => {
    // Handle different value types appropriately
    if (value === null || value === undefined) {
      // Skip null/undefined values or add them as empty strings
      if (options.includeNullValues) {
        formData.append(key, '');
      }

      // Otherwise skip this entry entirely
      return;
    } else if (
      typeof value === 'string' ||
      value instanceof Blob ||
      value instanceof File
    ) {
      // These types can be directly added to FormData
      formData.append(key, value);
    } else if (value instanceof Date) {
      // Convert dates to ISO strings
      formData.append(key, value.toISOString());
    } else {
      // Convert other types (numbers, booleans, etc.) to strings
      formData.append(key, String(value));
    }
  });

  return formData;
}
