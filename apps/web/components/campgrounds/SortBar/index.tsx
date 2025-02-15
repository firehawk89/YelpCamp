'use client';

import { DEFAULT_PAGE, PAGE_PARAM, SORT_BY_PARAM, SORT_ORDER_PARAM } from '@/utils/constants';
import { cn } from '@/utils/misc';
import { CardProps } from '@repo/ui/card';
import Divider from '@repo/ui/divider';
import { SelectOption } from '@repo/ui/select';
import useCustomSearchParams from 'hooks/useCustomSearchParams';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

import CampgroundsMobileFilterBar from '../FilterBar/MobileFilterBar';
import { DEFAULT_SORT_BY_OPTION, DEFAULT_SORT_ORDER_OPTION, SORT_BY_OPTIONS, SORT_ORDER_OPTIONS } from './helpers';
import SortControls from './SortControls';

const CampgroundsSortBar: FC<CardProps> = ({ className, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const selectedSortByOption = searchParams.get(SORT_BY_PARAM) || DEFAULT_SORT_BY_OPTION.value;
  const selectedSortOrderOption = searchParams.get(SORT_ORDER_PARAM) || DEFAULT_SORT_ORDER_OPTION.value;

  const handleSort = (sortOption: SelectOption, param: string) => {
    if (sortOption.value === selectedSortByOption || sortOption.value === selectedSortOrderOption) {
      return;
    }

    const params = { [param]: sortOption.value };
    if (searchParams.has(PAGE_PARAM)) {
      params[PAGE_PARAM] = DEFAULT_PAGE.toString();
    }
    const newSearchParamsString = getUpdatedSearchParamsString(params);

    router.replace(pathname + (newSearchParamsString ? `?${newSearchParamsString}` : ''));
  };

  return (
    <div className={cn('flex items-center gap-4', className)} {...props}>
      <div className="flex h-full gap-x-4 gap-y-2 max-sm:flex-col sm:items-center sm:py-2 lg:py-0">
        <SortControls
          label="Sort by"
          options={SORT_BY_OPTIONS}
          selectedOption={selectedSortByOption}
          handleSort={(sortOption) => handleSort(sortOption, SORT_BY_PARAM)}
        />

        <Divider className="max-sm:hidden" orientation="vertical" />

        <SortControls
          label="Sort order"
          options={SORT_ORDER_OPTIONS}
          selectedOption={selectedSortOrderOption}
          handleSort={(sortOption) => handleSort(sortOption, SORT_ORDER_PARAM)}
        />
      </div>

      <CampgroundsMobileFilterBar buttonClassName="ml-auto" overlayClassName="lg:hidden" />
    </div>
  );
};

export default CampgroundsSortBar;
