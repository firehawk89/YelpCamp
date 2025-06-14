'use client';

import { routes } from '@/app/routes';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { PAGE_PARAM, RATING_PARAM, SORT_BY_PARAM, SORT_ORDER_PARAM } from '@/utils/constants/params';
import { DEFAULT_PAGE } from '@repo/constants';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import {
  getDefaultSortByOption,
  getDefaultSortOrderOption,
  getSortByOptions,
  getSortOrderOptions,
} from '../components/SortBar/helpers';

const useFilter = () => {
  const t = useTranslations();

  const pathname = usePathname();
  const router = useRouter();
  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const selectedRating = Number(searchParams.get(RATING_PARAM) || '');

  const selectedSortByValue = searchParams.get(SORT_BY_PARAM) || getDefaultSortByOption(t).value;
  const selectedSortByOption = getSortByOptions(t).find((option) => option.value === selectedSortByValue);

  const selectedSortOrderValue = searchParams.get(SORT_ORDER_PARAM) || getDefaultSortOrderOption(t).value;
  const selectedSortOrderOption = getSortOrderOptions(t).find((option) => option.value === selectedSortOrderValue);

  const applyFilter = ({ param, value }: { param: string; value?: string | number }) => {
    if (searchParams.get(param) === value) {
      return;
    }

    const params = { [param]: value };

    if (searchParams.has(PAGE_PARAM)) {
      params[PAGE_PARAM] = DEFAULT_PAGE.toString();
    }

    const newSearchParamsString = getUpdatedSearchParamsString(params);
    router.push(routes.custom(pathname, newSearchParamsString));
  };

  return { selectedRating, selectedSortByOption, selectedSortOrderOption, applyFilter };
};

export default useFilter;
