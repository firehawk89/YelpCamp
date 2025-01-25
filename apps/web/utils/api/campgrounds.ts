'use server';

import { Campground } from 'types/campground';

import { API_ROUTES, ApiResponse } from '.';
import { SEARCH_PARAM } from '../constants';
import { getSearchParamsString } from '../misc';

type FetchCampgroundsParams = {
  search?: string;
};

export const fetchCampgrounds = async ({ search }: FetchCampgroundsParams): ApiResponse<Campground[]> => {
  try {
    const params = { [SEARCH_PARAM]: search };
    const searchParamsString = getSearchParamsString(params);

    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}${searchParamsString ? `?${searchParamsString}` : ''}`);
    if (!response.ok) {
      return { error: 'Failed to fetch campgrounds' };
    }

    const data: Campground[] = await response.json();
    return { data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campgrounds';
    return { error: errorMessage };
  }
};
