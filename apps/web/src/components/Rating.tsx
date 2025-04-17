'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MAX_RATING } from '@/utils/constants/validation';
import { cn, generateList } from '@/utils/misc';
import { StarIcon } from '@repo/ui/icons';
import Tooltip from '@repo/ui/tooltip';
import { HTMLAttributes, useCallback, useMemo, useState } from 'react';

interface RatingProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  starClassName?: string;
  rating?: number;
  maxStars?: number;
  selectable?: boolean;
  onChange?: (value?: number) => void;
}

const Rating = ({
  rating,
  maxStars = MAX_RATING,
  selectable = false,
  starClassName,
  className,
  onChange,
  ...props
}: RatingProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [selectedRating, setSelectedRating] = useState(rating);
  const [hoveredRating, setHoveredRating] = useState<number | undefined>(undefined);

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

  const handleMouseEnter = useCallback(
    (value: number) => {
      if (isDesktop) setHoveredRating(value);
    },
    [isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    if (isDesktop) setHoveredRating(undefined);
  }, [isDesktop]);

  const stars = useMemo(
    () =>
      generateList(maxStars, (i) => {
        const ratingValue = i + 1;
        const isFilled =
          hoveredRating !== undefined ? ratingValue <= hoveredRating : ratingValue <= (selectedRating || 0);

        const ratingButton = (
          <button
            className={cn({ 'cursor-pointer': selectable, 'cursor-default': !selectable })}
            onClick={selectable ? () => handleRatingClick(ratingValue) : undefined}
            onMouseEnter={selectable ? () => handleMouseEnter(ratingValue) : undefined}
            onMouseLeave={selectable ? handleMouseLeave : undefined}
            type="button"
          >
            <StarIcon
              className={cn(
                'text-accent size-7',
                {
                  'fill-accent': isFilled,
                },
                starClassName
              )}
            />
          </button>
        );

        return selectable ? (
          <li key={i}>
            <Tooltip label={`${ratingValue}${ratingValue < MAX_RATING ? '+' : ''}`}>{ratingButton}</Tooltip>
          </li>
        ) : (
          <li key={i}>{ratingButton}</li>
        );
      }),
    [
      handleMouseEnter,
      handleMouseLeave,
      handleRatingClick,
      hoveredRating,
      maxStars,
      selectable,
      selectedRating,
      starClassName,
    ]
  );

  return (
    <ul className={cn('flex items-center', className)} {...props}>
      {stars}
    </ul>
  );
};

export default Rating;
