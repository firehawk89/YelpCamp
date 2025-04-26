'use client';

import PaginatedContent from '@/components/PaginatedContent';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import { fetchCampgroundReviews } from '@/server/reviews';
import { fetchUserReviews } from '@/server/user';
import { PaginatedResponse } from '@/types/api';
import { Campground } from '@/types/campground';
import { Review } from '@/types/review';
import { User } from '@/types/user';
import { HTMLAttributes, useCallback } from 'react';

import ReviewsHeader from './ReviewsHeader';
import ReviewsList from './ReviewsList';

interface ReviewsProps extends HTMLAttributes<HTMLDivElement> {
  reviewsData?: PaginatedResponse<Review>;
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
  const fetchNewPage = useCallback(
    async (newPage: number) => {
      const fetchReviews = mode === 'campground' ? fetchCampgroundReviews : fetchUserReviews;
      const targetId = mode === 'campground' ? campground?._id : user?._id;

      if (!targetId) {
        return {
          error: `Cannot fetch reviews: missing ${mode} ID`,
        };
      }

      return fetchReviews(targetId, { page: newPage.toString() });
    },
    [campground?._id, mode, user?._id]
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
    defaultErrorMessage: 'Failed to load more reviews',
  });

  const { totalPages = 0 } = reviewsData?.metadata ?? {};

  return (
    <PaginatedContent
      elementsCount={reviews.length}
      error={initialError || error}
      isLoading={isLoading}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={fetchNextPage}
      emptyStateMessage="No reviews yet"
      pagination={false}
      {...props}
    >
      {mode === 'campground' && campground && (
        <ReviewsHeader userId={user?._id} campground={campground} reviews={reviews} />
      )}
      <ReviewsList reviews={reviews} user={user} mode={mode} />
    </PaginatedContent>
  );
};

export default Reviews;
