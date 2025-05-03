'use client';

import PaginatedContent from '@/components/PaginatedContent';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import CampgroundsList from '@/modules/campgrounds/components/CampgroundsList';
import { fetchUserFavoriteCampgrounds } from '@/server/user';
import { Campground } from '@/types/campground';
import { User } from '@/types/user';
import { PaginatedResponse } from '@repo/types';
import { HTMLAttributes, useCallback } from 'react';

interface FavoriteCampgroundsProps extends HTMLAttributes<HTMLDivElement> {
  campgroundsData?: PaginatedResponse<Campground>;
  user?: User | null;
  error?: string;
}

const FavoriteCampgrounds = ({ user, campgroundsData, error: initialError, ...props }: FavoriteCampgroundsProps) => {
  const fetchNewPage = useCallback(
    async (newPage: number) => {
      if (!user?._id) {
        return {
          error: 'Cannot fetch favorite campgrounds: missing user ID',
        };
      }
      return fetchUserFavoriteCampgrounds({ page: newPage.toString() });
    },
    [user?._id]
  );

  const {
    data: campgrounds,
    currentPage,
    isLoading,
    error,

    fetchNextPage,
  } = usePaginatedData<Campground>({
    initialData: campgroundsData,
    fetchPageData: fetchNewPage,
    defaultErrorMessage: 'Failed to load more favorite campgrounds',
  });

  const { totalPages = 0 } = campgroundsData?.metadata ?? {};

  return (
    <PaginatedContent
      elementsCount={campgrounds.length}
      error={initialError || error}
      isLoading={isLoading}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={fetchNextPage}
      emptyStateMessage="No favorite campgrounds yet"
      pagination={false}
      {...props}
    >
      <CampgroundsList campgrounds={campgrounds} user={user} />
    </PaginatedContent>
  );
};

export default FavoriteCampgrounds;
