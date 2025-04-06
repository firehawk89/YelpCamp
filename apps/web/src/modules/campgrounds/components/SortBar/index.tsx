'use client';

import useFilter from '@/modules/campgrounds/hooks/useFilter';
import { SORT_BY_PARAM, SORT_ORDER_PARAM } from '@/utils/constants';
import { cn } from '@/utils/misc';
import Divider from '@repo/ui/divider';
import { HTMLAttributes } from 'react';

import CampgroundsMobileFilterBar from '../FilterBar/MobileFilterBar';
import { SORT_BY_OPTIONS, SORT_ORDER_OPTIONS } from './helpers';
import SortControls from './SortControls';

const CampgroundsSortBar = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { selectedSortByOption, selectedSortOrderOption, applyFilter } = useFilter();

  return (
    <div className={cn('flex gap-4', className)} {...props}>
      <div className="flex h-full gap-x-4 gap-y-2 max-sm:flex-col sm:items-center sm:py-2 lg:py-0">
        <SortControls
          label="Sort by"
          options={SORT_BY_OPTIONS}
          selectedOption={selectedSortByOption}
          handleSort={(sortOption) => applyFilter({ param: SORT_BY_PARAM, value: sortOption.value })}
        />

        <Divider className="max-sm:hidden" orientation="vertical" />

        <SortControls
          label="Sort order"
          options={SORT_ORDER_OPTIONS}
          selectedOption={selectedSortOrderOption}
          handleSort={(sortOption) => applyFilter({ param: SORT_ORDER_PARAM, value: sortOption.value })}
        />
      </div>

      <CampgroundsMobileFilterBar buttonClassName="h-fit ml-auto" overlayClassName="lg:hidden" />
    </div>
  );
};

export default CampgroundsSortBar;
