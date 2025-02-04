import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isHomePage = (pathname: string) => pathname === '/';

export const getSearchParamsString = (params: Record<string, unknown>, existingParams?: string | URLSearchParams) => {
  const searchParams = new URLSearchParams(existingParams);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    } else {
      searchParams.delete(key);
    }
  });

  return searchParams.toString();
};
