'use client';

'use client';

import { routes } from '@/app/routes';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { DEFAULT_PAGE } from '@/utils/constants/defaults';
import { PAGE_PARAM, RATING_PARAM, SORT_BY_PARAM, SORT_ORDER_PARAM } from '@/utils/constants/params';
import { useRouter } from 'next/navigation';

import {
  DEFAULT_SORT_BY_OPTION,
  DEFAULT_SORT_ORDER_OPTION,
  SORT_BY_OPTIONS,
  SORT_ORDER_OPTIONS,
} from '../components/SortBar/helpers';

const useFilter = () => {
  const router = useRouter();
  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const selectedRating = Number(searchParams.get(RATING_PARAM) || '');

  const selectedSortByValue = searchParams.get(SORT_BY_PARAM) || DEFAULT_SORT_BY_OPTION.value;
  const selectedSortByOption = SORT_BY_OPTIONS.find((option) => option.value === selectedSortByValue);

  const selectedSortOrderValue = searchParams.get(SORT_ORDER_PARAM) || DEFAULT_SORT_ORDER_OPTION.value;
  const selectedSortOrderOption = SORT_ORDER_OPTIONS.find((option) => option.value === selectedSortOrderValue);

  const applyFilter = ({ param, value }: { param: string; value?: string | number }) => {
    if (searchParams.get(param) === value) {
      return;
    }

    const params = { [param]: value };

    if (searchParams.has(PAGE_PARAM)) {
      params[PAGE_PARAM] = DEFAULT_PAGE.toString();
    }

    const newSearchParamsString = getUpdatedSearchParamsString(params);
    router.push(routes.campgrounds(newSearchParamsString));
  };

  return { selectedRating, selectedSortByOption, selectedSortOrderOption, applyFilter };
};

export default useFilter;
