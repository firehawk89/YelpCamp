import { Campground } from '@/types/campground';
import { MAX_RATING } from '@/utils/constants/validation';
import { cn, round } from '@/utils/misc';
import { StarIcon } from '@repo/ui/icons';
import { HTMLAttributes } from 'react';

interface CampgroundRatingProps extends HTMLAttributes<HTMLParagraphElement> {
  rating: Campground['rating'];
}

const CampgroundRating = ({ rating, className, ...props }: CampgroundRatingProps) => (
  <p className={cn('flex items-center gap-1', className)} {...props}>
    <StarIcon className={cn('text-accent', { 'fill-accent': rating })} />

    {rating ? (
      <>
        <span className="text-lg">{round(rating)}</span>
        <span className="text-neutral-500">/{MAX_RATING}</span>
      </>
    ) : (
      <span className="text-sm text-neutral-500">No rating yet</span>
    )}
  </p>
);

export default CampgroundRating;
