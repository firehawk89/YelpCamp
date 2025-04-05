import Rating from '@/components/Rating';
import { type Review } from '@/types/review';
import { User } from '@/types/user';
import { formatDate } from '@/utils/date';
import { cn } from '@/utils/misc';
import Avatar from '@repo/ui/avatar';
import { HTMLAttributes } from 'react';

import LikeReviewButton from './LikeReviewButton';

interface ReviewProps extends HTMLAttributes<HTMLLIElement> {
  userId?: User['_id'];
  review: Review;
  className?: string;
}

const ReviewCard = ({ userId, review, className, ...props }: ReviewProps) => {
  const { createdAt, likedBy, author, body, title, rating } = review;

  const createdAtDate = formatDate(new Date(createdAt));
  const likesCount = likedBy.length;

  return (
    <li className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar />

          <div className="flex flex-col">
            <span>{author.email}</span>
            <Rating rating={rating} starClassName="size-5" />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-neutral-500">{createdAtDate}</span>

          <div className="flex items-center gap-0.5">
            {!!likesCount && <span className="text-sm">{likesCount}</span>}

            <LikeReviewButton userId={userId} review={review} likedBy={likedBy} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {!!title && <h3 className="text-lg font-semibold">{title}</h3>}
        <p>{body}</p>
      </div>
    </li>
  );
};

export default ReviewCard;
