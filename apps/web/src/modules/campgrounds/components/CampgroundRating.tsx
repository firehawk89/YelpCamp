import { Campground } from '@/types/campground';
import { cn, round } from '@/utils/misc';
import { MAX_REVIEW_RATING } from '@repo/constants';
import { StarIcon } from '@repo/ui/icons';
import { HTMLAttributes } from 'react';

interface CampgroundRatingProps extends HTMLAttributes<HTMLParagraphElement> {
  rating: Campground['rating'];
  preview?: boolean;
}

const CampgroundRating = ({ rating, preview, className, ...props }: CampgroundRatingProps) => (
  <p className={cn('flex items-center gap-1', className)} {...props}>
    <StarIcon className={cn('text-accent', { 'fill-accent': rating })} />

    {rating ? (
      <>
        <span className={cn({ 'text-lg': !preview })}>{round(rating)}</span>
        <span className="text-neutral-500">/{MAX_REVIEW_RATING}</span>
      </>
    ) : (
      <span className="text-sm text-neutral-500">No rating yet</span>
    )}
  </p>
);

export default CampgroundRating;
