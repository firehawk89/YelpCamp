import { Campground } from '@/types/campground';
import { Review } from '@/types/review';
import { User } from '@/types/user';
import { POSITIVE_RATING_THRESHOLD, RECOMMENDED_PERCENTAGE_THRESHOLD } from '@/utils/constants';
import { cn } from '@/utils/misc';
import Divider from '@repo/ui/divider';
import { ThumbDown, ThumbUp } from '@repo/ui/icons';
import { HTMLAttributes, useMemo } from 'react';

import CampgroundRating from '../CampgroundRating';
import AddReviewButton from './AddReviewButton';

interface ReviewsHeaderProps extends HTMLAttributes<HTMLDivElement> {
  user: User | null;
  campground: Campground;
  reviews: Review[];
}

const ReviewsHeader = ({ user, campground, reviews, className, ...props }: ReviewsHeaderProps) => {
  const recommendationPercentage = useMemo(() => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return 0;

    const positiveReviews = reviews.filter((review) => review.rating >= POSITIVE_RATING_THRESHOLD);
    const percentage = Math.round((positiveReviews.length / totalReviews) * 100);

    return percentage;
  }, [reviews]);

  const isRecommended = recommendationPercentage >= RECOMMENDED_PERCENTAGE_THRESHOLD;

  const canUserAddReview = useMemo(() => {
    if (!user) return false;
    const isAlreadyReviewed = reviews.some((review) => review.author._id === user?._id);
    return !isAlreadyReviewed;
  }, [reviews, user]);

  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <div className="flex justify-between gap-5">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {!canUserAddReview && <AddReviewButton campgroundName={campground.title} />}
      </div>

      <div className="flex h-full items-center gap-3">
        <CampgroundRating rating={campground.rating} />

        <Divider className="h-6" orientation="vertical" />

        <p className="flex shrink-0 items-center gap-1 text-sm text-neutral-600">
          {isRecommended ? <ThumbUp className="text-success" /> : <ThumbDown className="text-danger" />}
          {recommendationPercentage}% of travelers recommend this campground
        </p>
      </div>
    </div>
  );
};

export default ReviewsHeader;
