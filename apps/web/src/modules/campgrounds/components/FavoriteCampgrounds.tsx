'use client';

import PaginatedContent from '@/components/PaginatedContent';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import CampgroundsList from '@/modules/campgrounds/components/CampgroundsList';
import { fetchUserFavoriteCampgrounds } from '@/server/user';
import { Campground } from '@/types/campground';
import { User } from '@/types/user';
import { PaginatedResponse } from '@repo/types';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useCallback } from 'react';

interface FavoriteCampgroundsProps extends HTMLAttributes<HTMLDivElement> {
  campgroundsData?: PaginatedResponse<Campground>;
  user?: User | null;
  error?: string;
}

const FavoriteCampgrounds = ({ user, campgroundsData, error: initialError, ...props }: FavoriteCampgroundsProps) => {
  const t = useTranslations('pages.profile.favorites');

  const fetchNewPage = useCallback(
    async (newPage: number) => {
      if (!user?._id) {
        return {
          error: t('errors.missingUserId'),
        };
      }
      return fetchUserFavoriteCampgrounds({ page: newPage.toString() });
    },
    [user?._id, t]
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
    defaultErrorMessage: t('errors.default'),
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
      emptyStateMessage={t('emptyState')}
      pagination={false}
      {...props}
    >
      <CampgroundsList campgrounds={campgrounds} user={user} />
    </PaginatedContent>
  );
};

export default FavoriteCampgrounds;
