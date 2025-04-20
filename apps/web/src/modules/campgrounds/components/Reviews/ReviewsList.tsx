import { Review } from '@/types/review';
import { User } from '@/types/user';
import { HTMLAttributes } from 'react';

import ReviewCard from './ReviewCard';

interface ReviewsListProps extends HTMLAttributes<HTMLUListElement> {
  reviews: Review[];
  user?: User | null;
  mode: 'campground' | 'user';
}

const ReviewsList = ({ reviews, user, mode, ...props }: ReviewsListProps) => (
  <ul className="flex flex-col gap-8" {...props}>
    {reviews.map((review) => (
      <ReviewCard key={review._id} user={user} review={review} mode={mode} />
    ))}
  </ul>
);

export default ReviewsList;
