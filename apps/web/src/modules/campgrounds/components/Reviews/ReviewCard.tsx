import { routes } from '@/app/routes';
import Rating from '@/components/Rating';
import { type Review } from '@/types/review';
import { User } from '@/types/user';
import { formatDate } from '@/utils/date';
import { cn } from '@/utils/misc';
import Avatar from '@repo/ui/avatar';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

import LikeReviewButton from './LikeReviewButton';

interface ReviewProps extends HTMLAttributes<HTMLLIElement> {
  review: Review;
  user: User | null;
  mode?: 'campground' | 'user';
}

const ReviewCard = ({ user, review, mode = 'campground', className, ...props }: ReviewProps) => {
  const { createdAt, likedBy, author, body, title, rating } = review;

  const isUserProfileReview = mode === 'user' && user?._id === author._id;
  const createdAtDate = formatDate(new Date(createdAt));
  const likesCount = likedBy.length;

  return (
    <li className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {!isUserProfileReview && <Avatar src={user?.avatar} />}

          <div className="flex flex-col gap-0.5">
            {isUserProfileReview ? (
              <h2 className="text-lg font-semibold">
                <Link href={routes.campgrounds(review.campground.slug)} className="text-accent">
                  {review.campground.title}
                </Link>{' '}
                review
              </h2>
            ) : (
              <span>{author.email}</span>
            )}
            <Rating rating={rating} starClassName="size-5" />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-neutral-500">{createdAtDate}</span>

          <div className="flex items-center gap-0.5">
            {!!likesCount && <span className="text-sm">{likesCount}</span>}
            <LikeReviewButton userId={user?._id} review={review} likedBy={likedBy} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {!!title && <h3 className="text-lg font-medium">{title}</h3>}
        <p>{body}</p>
      </div>
    </li>
  );
};

export default ReviewCard;
