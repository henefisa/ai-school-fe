import { getEndpoint } from '@/apis/instance';

export const getFUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return '';

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${getEndpoint()}${pathOrUrl}`;
};
