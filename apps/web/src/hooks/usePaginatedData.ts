'use client';

import { DEFAULT_PAGE } from '@repo/constants';
import { PaginatedApiResponse, PaginatedResponse } from '@repo/types';
import { useCallback, useEffect, useState } from 'react';

interface UsePaginatedDataProps<T> {
  initialData?: PaginatedResponse<T>;
  fetchPageData: (newPage: number) => PaginatedApiResponse<T>;
  defaultErrorMessage?: string;
}

interface UsePaginatedDataReturn<T> {
  data: T[];
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchNextPage: (newPage: number) => Promise<void>;
}

export function usePaginatedData<T extends { _id: string }>({
  initialData,
  fetchPageData,
  defaultErrorMessage = 'Failed to load more data',
}: UsePaginatedDataProps<T>): UsePaginatedDataReturn<T> {
  const [data, setData] = useState<T[]>(initialData?.data ?? []);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { totalPages = 0 } = initialData?.metadata ?? {};
  const hasMore = currentPage < totalPages;

  const fetchNextPage = useCallback(
    async (newPage: number) => {
      if (newPage <= currentPage || isLoading || newPage > totalPages) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { result, error: fetchError } = await fetchPageData(newPage);

        if (fetchError) {
          throw new Error(typeof fetchError === 'string' ? fetchError : fetchError.join(', '));
        }

        if (result?.data?.length) {
          setCurrentPage(newPage);

          setData((prevData) => {
            const uniqueNewData =
              result?.data.filter((newItem) => !prevData.some((prevItem) => prevItem._id === newItem._id)) || [];

            return [...prevData, ...uniqueNewData];
          });
        } else if (result?.data && result.data.length === 0) {
          setCurrentPage(totalPages);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : defaultErrorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, defaultErrorMessage, fetchPageData, isLoading, totalPages]
  );

  useEffect(() => {
    setData(initialData?.data ?? []);
    setCurrentPage(initialData?.metadata?.page || DEFAULT_PAGE);
  }, [initialData]);

  return {
    data,
    currentPage,
    isLoading,
    error,
    hasMore,
    fetchNextPage,
  };
}
