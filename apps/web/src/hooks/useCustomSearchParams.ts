'use client';

import { getSearchParamsString } from '@/utils/misc';
import { useSearchParams } from 'next/navigation';

const useCustomSearchParams = () => {
  const searchParams = useSearchParams();

  const getUpdatedSearchParamsString = (newParams: Record<string, unknown>) =>
    getSearchParamsString(newParams, searchParams);

  return { searchParams, getUpdatedSearchParamsString };
};

export default useCustomSearchParams;
