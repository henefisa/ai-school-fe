'use server';

import { parseNestedEntries } from '@/utils/group-by-entries';
import { formSchema } from './schema';

interface FormState {
  isSuccess: boolean;
  message: string;
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formEntries = Array.from(data.entries());
  const formData = parseNestedEntries(formEntries);

  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(parsed.error);

    return {
      isSuccess: false,
      message: 'Invalid form data',
    };
  }

  return {
    isSuccess: true,
    message: 'Student created successfully',
  };
}
