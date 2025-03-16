import { redirect } from 'next/navigation';

/**
  This function doesn't return as it triggers a redirect.
*/
export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
