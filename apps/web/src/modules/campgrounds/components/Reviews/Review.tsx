import Rating from '@/components/Rating';
import { type Review } from '@/types/review';
import { formatDate } from '@/utils/date';
import { cn } from '@/utils/misc';
import Avatar from '@repo/ui/avatar';
import Button from '@repo/ui/button';
import { ThumbUp } from '@repo/ui/icons';
import Tooltip from '@repo/ui/tooltip';
import { HTMLAttributes } from 'react';

interface ReviewProps extends HTMLAttributes<HTMLLIElement> {
  review: Review;
  className?: string;
}

const Review = ({ review, className, ...props }: ReviewProps) => {
  const createdAtDate = formatDate(new Date(review.createdAt));
  const likesCount = 0;

  return (
    <li className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar />

          <div className="flex flex-col">
            <span>{review.author.email}</span>
            <Rating rating={review.rating} starClassName="size-5" />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-neutral-500">{createdAtDate}</span>

          <div className="flex items-center gap-0.5">
            <span>{likesCount}</span>
            <Tooltip label="Helpful">
              <Button icon={<ThumbUp />} />
            </Tooltip>
          </div>
        </div>
      </div>

      <p>{review.body}</p>
    </li>
  );
};

export default Review;
