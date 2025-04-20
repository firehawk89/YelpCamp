'use client';

import { fetchCampgroundReviews } from '@/server/reviews';
import { fetchUserReviews } from '@/server/user';
import { PaginatedResponse } from '@/types/api';
import { Campground } from '@/types/campground';
import { Review } from '@/types/review';
import { User } from '@/types/user';
import { DEFAULT_PAGE } from '@/utils/constants/defaults';
import { cn } from '@/utils/misc';
import Alert from '@repo/ui/alert';
import { HTMLAttributes, useCallback, useEffect, useState } from 'react';

import LoadMoreButton from './LoadMoreButton';
import ReviewsHeader from './ReviewsHeader';
import ReviewsList from './ReviewsList';

interface ReviewsProps extends HTMLAttributes<HTMLDivElement> {
  reviewsData?: PaginatedResponse<Review>;
  user?: User | null;
  campground?: Campground;
  error?: string;
  mode?: 'campground' | 'user';
}

const Reviews = ({ user, reviewsData, campground, error, mode = 'campground', className, ...props }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(reviewsData?.data ?? []);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const { totalPages = 0 } = reviewsData?.metadata ?? {};

  const hasReviews = reviews.length > 0;
  const hasMoreReviews = currentPage < totalPages;
  const showEmptyState = !error && !loadError && !hasReviews;
  const showReviewsList = !error && !loadError && hasReviews;

  const fetchReviewsByPage = useCallback(
    async (newPage: number) => {
      if (newPage <= currentPage || isLoading || newPage > totalPages) {
        return;
      }

      setIsLoading(true);
      setLoadError(null);

      try {
        const fetchReviews = mode === 'campground' ? fetchCampgroundReviews : fetchUserReviews;
        const targetId = mode === 'campground' ? campground?._id : user?._id;

        if (!targetId) {
          throw new Error(`Cannot fetch reviews: missing ${mode} ID`);
        }

        const { result, error } = await fetchReviews(targetId, { page: newPage.toString() });

        if (error) {
          throw new Error(typeof error === 'string' ? error : error.join(', '));
        }

        if (result?.data?.length) {
          setCurrentPage(newPage);

          setReviews((prevReviews) => {
            const uniqueNewReviews =
              result?.data.filter((newReview) => !prevReviews.some((prevReview) => prevReview._id === newReview._id)) ||
              [];

            return [...prevReviews, ...uniqueNewReviews];
          });
        } else if (result?.data && result.data.length === 0) {
          setCurrentPage(totalPages);
        }
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Failed to load more reviews');
      } finally {
        setIsLoading(false);
      }
    },
    [campground?._id, currentPage, isLoading, mode, totalPages, user?._id]
  );

  useEffect(() => {
    if (reviewsData?.data?.length) {
      setReviews(reviewsData.data);
      setCurrentPage(reviewsData.metadata?.page || DEFAULT_PAGE);
    }
  }, [reviewsData]);

  return (
    <div id="reviews" className={cn('flex w-full min-w-80 flex-col gap-6', className)} {...props}>
      {mode === 'campground' && campground && (
        <ReviewsHeader userId={user?._id} campground={campground} reviews={reviews} />
      )}

      {showEmptyState && (
        <Alert className="w-full" color="info">
          No reviews yet
        </Alert>
      )}

      {error && (
        <Alert className="w-full" color="danger">
          {error}
        </Alert>
      )}

      {loadError && (
        <Alert className="w-full" color="danger">
          {loadError}
        </Alert>
      )}

      {showReviewsList && <ReviewsList reviews={reviews} user={user} mode={mode} />}

      {hasMoreReviews && (
        <LoadMoreButton
          page={currentPage}
          totalPages={totalPages}
          onPageChange={fetchReviewsByPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Reviews;
