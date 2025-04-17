import { getSessionUser } from '@/server/session';
import { Campground } from '@/types/campground';
import { Review } from '@/types/review';
import { cn } from '@/utils/misc';
import Alert from '@repo/ui/alert';
import { HTMLAttributes } from 'react';

import ReviewCard from './ReviewCard';
import ReviewsHeader from './ReviewsHeader';

interface ReviewsProps extends HTMLAttributes<HTMLDivElement> {
  reviews?: Review[];
  campground?: Campground;
  error?: string;
  mode?: 'campground' | 'user';
}

const Reviews = async ({ reviews, campground, error, mode = 'campground', className, ...props }: ReviewsProps) => {
  const user = await getSessionUser();

  return (
    <div id="reviews" className={cn('flex w-full min-w-80 flex-col gap-6', className)} {...props}>
      {mode === 'campground' && campground && (
        <ReviewsHeader userId={user?._id} campground={campground} reviews={reviews} />
      )}

      {!error && !reviews?.length && (
        <Alert className="w-full" color="info">
          No reviews yet
        </Alert>
      )}

      {error && (
        <Alert className="w-full" color="danger">
          {error}
        </Alert>
      )}

      {!error && !!reviews?.length && (
        <ul className="flex flex-col gap-8">
          {reviews?.map((review) => <ReviewCard key={review._id} user={user} review={review} mode={mode} />)}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
