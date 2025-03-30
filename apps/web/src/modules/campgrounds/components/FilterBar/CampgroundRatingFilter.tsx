'use client';

import { routes } from '@/app/routes';
import Rating from '@/components/Rating';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { DEFAULT_PAGE, PAGE_PARAM, RATING_PARAM } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const CampgroundRatingFilter = () => {
  const router = useRouter();

  const { searchParams, getUpdatedSearchParamsString } = useCustomSearchParams();

  const defaultRating = Number(searchParams.get(RATING_PARAM) || '');

  const handleRatingChange = (selectedRating?: number) => {
    if (selectedRating === defaultRating) {
      return;
    }

    const params: Record<string, string | undefined> = {};
    params[RATING_PARAM] = selectedRating?.toString();

    if (searchParams.has(PAGE_PARAM)) {
      params[PAGE_PARAM] = DEFAULT_PAGE.toString();
    }

    const newSearchParamsString = getUpdatedSearchParamsString(params);
    router.push(routes.campgrounds(newSearchParamsString));
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-medium">Rating</span>
      <Rating rating={defaultRating} onChange={handleRatingChange} />
    </div>
  );
};

export default CampgroundRatingFilter;
