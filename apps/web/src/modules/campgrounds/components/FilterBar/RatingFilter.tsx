'use client';

import Rating from '@/components/Rating';
import { RATING_PARAM } from '@/utils/constants/params';
import { useTranslations } from 'next-intl';

import useFilter from '../../hooks/useFilter';

const CampgroundRatingFilter = () => {
  const t = useTranslations('pages.campgrounds.filter.rating');
  const { selectedRating, applyFilter } = useFilter();

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-semibold">{t('label')}</span>
      <Rating
        rating={selectedRating}
        onChange={(rating) => applyFilter({ param: RATING_PARAM, value: rating })}
        selectable
      />
    </div>
  );
};

export default CampgroundRatingFilter;
