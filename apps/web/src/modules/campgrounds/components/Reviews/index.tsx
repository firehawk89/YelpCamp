import { Campground } from '@/types/campground';
import { fetchCampgroundReviews } from '@/utils/api/reviews';
import { cn } from '@/utils/misc';
import { getSessionUser } from '@/utils/session';
import { HTMLAttributes } from 'react';

import Review from './Review';
import ReviewsHeader from './ReviewsHeader';

interface ReviewsProps extends HTMLAttributes<HTMLDivElement> {
  campground: Campground;
}

const Reviews = async ({ campground, className, ...props }: ReviewsProps) => {
  const user = await getSessionUser();
  const { result: campgroundReviews, error } = await fetchCampgroundReviews(campground._id);

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.join(', '));
  }

  console.log('campgroundReviews', campgroundReviews);

  return (
    <div id="reviews" className={cn('flex flex-col gap-6', className)} {...props}>
      {campgroundReviews && <ReviewsHeader user={user} campground={campground} reviews={campgroundReviews} />}

      <ul className="flex flex-col gap-10">
        {campgroundReviews?.map((review) => <Review key={review._id} review={review} />)}
      </ul>
    </div>
  );
};

export default Reviews;
