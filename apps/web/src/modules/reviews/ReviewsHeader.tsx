import { Campground } from '@/types/campground';
import { Review } from '@/types/review';
import { User } from '@/types/user';
import { POSITIVE_RATING_THRESHOLD, POSITIVE_RATING_PERCENTAGE_THRESHOLD } from '@/utils/constants/misc';
import { cn } from '@/utils/misc';
import Divider from '@repo/ui/divider';
import { ThumbDownIcon, ThumbUpIcon } from '@repo/ui/icons';
import { HTMLAttributes, useMemo } from 'react';

import CampgroundRating from '../campgrounds/components/CampgroundRating';
import AddReviewButton from './AddReviewButton';

interface ReviewsHeaderProps extends HTMLAttributes<HTMLDivElement> {
  userId?: User['_id'];
  campground: Campground;
  reviews?: Review[];
}

const ReviewsHeader = ({ userId, campground, reviews, className, ...props }: ReviewsHeaderProps) => {
  const recommendationPercentage = useMemo(() => {
    const totalReviews = reviews?.length ?? 0;
    if (!reviews || totalReviews === 0) return totalReviews;

    const positiveReviews = reviews.filter((review) => review.rating >= POSITIVE_RATING_THRESHOLD);
    const percentage = Math.round((positiveReviews.length / totalReviews) * 100);

    return percentage;
  }, [reviews]);

  const isRecommended = recommendationPercentage >= POSITIVE_RATING_PERCENTAGE_THRESHOLD;

  const canUserAddReview = useMemo(() => {
    if (!userId) return false;
    const isAlreadyReviewed = reviews?.some((review) => review.author._id === userId);
    return !isAlreadyReviewed;
  }, [reviews, userId]);

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex justify-between gap-5">
        <h2 className="text-2xl font-bold">Reviews</h2>

        {canUserAddReview && <AddReviewButton userId={userId} campground={campground} />}
      </div>

      <div className="flex h-full flex-col items-center gap-1 sm:flex-row sm:gap-3">
        <CampgroundRating rating={campground.rating} />

        <Divider className="h-6 max-sm:hidden" orientation="vertical" />

        <p className="flex shrink-0 items-center gap-1 text-neutral-600">
          {reviews?.length ? (
            <>
              {isRecommended ? <ThumbUpIcon className="text-success" /> : <ThumbDownIcon className="text-danger" />}
              {recommendationPercentage}% of travelers recommend this campground
            </>
          ) : (
            'Be the first to write a review!'
          )}
        </p>
      </div>
    </div>
  );
};

export default ReviewsHeader;
