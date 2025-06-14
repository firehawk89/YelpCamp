'use client';

import useFilter from '@/modules/campgrounds/hooks/useFilter';
import { SORT_BY_PARAM, SORT_ORDER_PARAM } from '@/utils/constants/params';
import { cn } from '@/utils/misc';
import Divider from '@repo/ui/divider';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

import CampgroundsMobileFilterBar from '../FilterBar/MobileFilterBar';
import { getSortByOptions, getSortOrderOptions } from './helpers';
import SortControl from './SortControl';

const CampgroundsSortBar = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const t = useTranslations();

  const { selectedSortByOption, selectedSortOrderOption, applyFilter } = useFilter();

  return (
    <div className={cn('flex gap-4', className)} {...props}>
      <div className="flex h-full gap-x-4 gap-y-2 max-sm:flex-col sm:items-center sm:py-2 lg:py-0">
        <SortControl
          label={t('pages.campgrounds.sort.sortBy')}
          options={getSortByOptions(t)}
          selectedOption={selectedSortByOption}
          handleSort={(sortOption) => applyFilter({ param: SORT_BY_PARAM, value: sortOption.value })}
        />

        <Divider className="max-sm:hidden" orientation="vertical" />

        <SortControl
          label={t('pages.campgrounds.sort.sortOrder')}
          options={getSortOrderOptions(t)}
          selectedOption={selectedSortOrderOption}
          handleSort={(sortOption) => applyFilter({ param: SORT_ORDER_PARAM, value: sortOption.value })}
        />
      </div>

      <CampgroundsMobileFilterBar buttonClassName="h-fit ml-auto" overlayClassName="lg:hidden" />
    </div>
  );
};

export default CampgroundsSortBar;
