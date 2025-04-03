'use client';

import Rating from '@/components/Rating';
import { RATING_PARAM } from '@/utils/constants';

import useFilter from '../../hooks/useFilter';

const CampgroundRatingFilter = () => {
  const { selectedRating, applyFilter } = useFilter();

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-medium">Rating</span>
      <Rating
        rating={selectedRating}
        onChange={(rating) => applyFilter({ param: RATING_PARAM, value: rating })}
        selectable
      />
    </div>
  );
};

export default CampgroundRatingFilter;
