'use server';

import { PaginatedApiResponse, PaginatedResponse } from 'types/api';
import { Campground, CampgroundsFilterDto } from 'types/campground';

import { API_ROUTES, PAGE_PARAM, SEARCH_PARAM, SORT_BY_PARAM, SORT_ORDER_PARAM } from '../constants';
import { getSearchParamsString } from '../misc';

export const fetchCampgrounds = async ({
  search,
  page,
  sortBy,
  sortOrder,
}: CampgroundsFilterDto): PaginatedApiResponse<Campground> => {
  try {
    const searchParamsString = getSearchParamsString({
      [SEARCH_PARAM]: search,
      [PAGE_PARAM]: page,
      [SORT_BY_PARAM]: sortBy,
      [SORT_ORDER_PARAM]: sortOrder,
    });

    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}${searchParamsString ? `?${searchParamsString}` : ''}`);
    if (!response.ok) {
      return { error: 'Failed to fetch campgrounds' };
    }

    const result: PaginatedResponse<Campground> = await response.json();
    return { result };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campgrounds';
    return { error: errorMessage };
  }
};
