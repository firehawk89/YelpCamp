import { fetchCampgroundReviews } from '@/server/reviews';
import { getSessionUser } from '@/server/session';
import { Campground } from '@/types/campground';
import { cn } from '@/utils/misc';
import Alert from '@repo/ui/alert';
import { HTMLAttributes } from 'react';

import ReviewCard from './ReviewCard';
import ReviewsHeader from './ReviewsHeader';

interface ReviewsProps extends HTMLAttributes<HTMLDivElement> {
  campground: Campground;
}

const Reviews = async ({ campground, className, ...props }: ReviewsProps) => {
  const user = await getSessionUser();
  const { result: campgroundReviews, error } = await fetchCampgroundReviews(campground._id);

  return (
    <div id="reviews" className={cn('flex w-full min-w-80 flex-col gap-6 lg:mx-auto lg:w-[75%]', className)} {...props}>
      <ReviewsHeader userId={user?._id} campground={campground} reviews={campgroundReviews} />

      {error && (
        <Alert className="w-full" color="danger">
          {error}
        </Alert>
      )}

      {!error && !!campgroundReviews?.length && (
        <ul className="flex flex-col gap-8">
          {campgroundReviews?.map((review) => <ReviewCard key={review._id} userId={user?._id} review={review} />)}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
