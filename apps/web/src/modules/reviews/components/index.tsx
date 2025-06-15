'use client';

import PaginatedContent from '@/components/PaginatedContent';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import { fetchCampgroundReviews } from '@/server/reviews';
import { fetchUserReviews } from '@/server/user';
import { Campground } from '@/types/campground';
import { Review } from '@/types/review';
import { User } from '@/types/user';
import { PaginatedResponse, PaginationMetadata, ReviewsMetadata } from '@repo/types';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useCallback } from 'react';

import ReviewsHeader from './ReviewsHeader';
import ReviewsList from './ReviewsList';

interface ReviewsProps extends HTMLAttributes<HTMLDivElement> {
  reviewsData?: PaginatedResponse<Review, PaginationMetadata | ReviewsMetadata>;
  user?: User | null;
  campground?: Campground;
  error?: string;
  mode?: 'campground' | 'user';
}

const Reviews = ({
  user,
  reviewsData,
  campground,
  error: initialError,
  mode = 'campground',
  ...props
}: ReviewsProps) => {
  const t = useTranslations('pages.campground');

  const fetchNewPage = useCallback(
    async (newPage: number) => {
      const fetchReviews = mode === 'campground' ? fetchCampgroundReviews : fetchUserReviews;
      const targetId = mode === 'campground' ? campground?._id : user?._id;

      if (!targetId) {
        return {
          error: t('reviews.errors.missingTargetId', { target: mode }),
        };
      }

      return fetchReviews(targetId, { page: newPage.toString() });
    },
    [campground?._id, mode, user?._id, t]
  );

  const {
    data: reviews,
    currentPage,
    isLoading,
    error,
    fetchNextPage,
  } = usePaginatedData<Review>({
    initialData: reviewsData,
    fetchPageData: fetchNewPage,
    defaultErrorMessage: t('reviews.errors.default'),
  });

  const { totalPages = 0 } = reviewsData?.metadata ?? {};

  return (
    <div className="flex w-full flex-col gap-6">
      {mode === 'campground' && !!campground && (
        <ReviewsHeader
          userId={user?._id}
          campground={campground}
          reviews={reviews}
          reviewsMetadata={reviewsData?.metadata as ReviewsMetadata}
        />
      )}

      <PaginatedContent
        id="reviews"
        elementsCount={reviews.length}
        error={initialError || error}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchNextPage}
        emptyStateMessage={t('reviewsCount', { count: 0 })}
        pagination={false}
        {...props}
      >
        <ReviewsList reviews={reviews} user={user} mode={mode} />
      </PaginatedContent>
    </div>
  );
};

export default Reviews;
