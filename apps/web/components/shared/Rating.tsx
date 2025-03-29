'use client';

import { MAX_RATING } from '@/utils/constants';
import { cn, generateList } from '@/utils/misc';
import { StarIcon } from '@repo/ui/icons';
import Tooltip from '@repo/ui/tooltip';
import { HTMLAttributes, useCallback, useMemo, useState } from 'react';

interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  rating?: number;
  className?: string;
  maxStars?: number;
  onChange?: (value?: number) => void;
}

const Rating = ({ rating, className, maxStars = MAX_RATING, onChange, ...props }: RatingProps) => {
  const [selectedRating, setSelectedRating] = useState(rating);
  const [hoveredRating, setHoveredRating] = useState<number>();

  const handleRatingClick = useCallback(
    (value: number) => {
      if (value === selectedRating) {
        setSelectedRating(undefined);
        onChange?.();
      } else {
        setSelectedRating(value);
        onChange?.(value);
      }
    },
    [onChange, selectedRating]
  );

  const handleMouseEnter = (value: number) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(undefined);
  };

  const stars = useMemo(
    () =>
      generateList(maxStars, (i) => {
        const ratingValue = i + 1;
        const isFilled = hoveredRating ? ratingValue <= hoveredRating : ratingValue <= (selectedRating || 0);

        return (
          <Tooltip key={i} label={`${ratingValue}${ratingValue < MAX_RATING ? '+' : ''}`}>
            <button
              className="cursor-pointer"
              onClick={() => handleRatingClick(ratingValue)}
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onMouseLeave={handleMouseLeave}
            >
              <StarIcon
                className={cn('text-accent size-7', {
                  'fill-accent': isFilled,
                })}
              />
            </button>
          </Tooltip>
        );
      }),
    [handleRatingClick, hoveredRating, maxStars, selectedRating]
  );

  return (
    <div className={cn('flex items-center', className)} {...props}>
      {stars}
    </div>
  );
};

export default Rating;
