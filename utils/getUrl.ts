import { getEndpoint } from '@/apis/instance';

export const getUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return '';

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${getEndpoint()}${pathOrUrl}`;
};
