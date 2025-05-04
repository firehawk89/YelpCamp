import { Review } from '@/types/review';
import { User } from '@/types/user';

import ReviewCard from '../ReviewCard';
import ReviewCardWrapper from '../ReviewCard/Wrapper';
import ReviewsListWrapper from './Wrapper';

interface ReviewsListProps {
  reviews: Review[];
  user?: User | null;
  mode?: 'campground' | 'user';
}

const ReviewsList = ({ reviews, user, mode, ...props }: ReviewsListProps) => (
  <ReviewsListWrapper className="flex flex-col gap-8" {...props}>
    {reviews.map((review) => (
      <ReviewCardWrapper key={review._id}>
        <ReviewCard key={review._id} user={user} review={review} mode={mode} />
      </ReviewCardWrapper>
    ))}
  </ReviewsListWrapper>
);

export default ReviewsList;
