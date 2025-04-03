import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getSearchParamsString = <T extends object>(params: T, existingParams?: string | URLSearchParams) => {
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

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

export const generateList = <T>(length: number, generator: (index: number) => T): T[] => {
  return Array.from({ length }, (_, index) => generator(index));
};

export const round = (value: number, precision: number = 2) => parseFloat(value.toFixed(precision));
