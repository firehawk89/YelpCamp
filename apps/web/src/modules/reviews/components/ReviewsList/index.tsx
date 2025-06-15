import { Review } from '@/types/review';
import { User } from '@/types/user';
import { useLocale } from 'next-intl';

import ReviewCard from '../ReviewCard';
import ReviewCardWrapper from '../ReviewCard/Wrapper';
import ReviewsListWrapper from './Wrapper';

interface ReviewsListProps {
  reviews: Review[];
  user?: User | null;
  mode?: 'campground' | 'user';
}

const ReviewsList = ({ reviews, user, mode, ...props }: ReviewsListProps) => {
  const locale = useLocale();

  return (
    <ReviewsListWrapper className="flex flex-col gap-8" {...props}>
      {reviews.map((review) => (
        <ReviewCardWrapper key={review._id}>
          <ReviewCard user={user} review={review} mode={mode} locale={locale} />
        </ReviewCardWrapper>
      ))}
    </ReviewsListWrapper>
  );
};

export default ReviewsList;
