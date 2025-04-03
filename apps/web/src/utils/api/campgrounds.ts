'use server';

import { ApiResponse, PaginatedApiResponse, PaginatedResponse } from '@/types/api';
import { Campground, CampgroundsFilterDto } from '@/types/campground';

import { API_ROUTES } from '../constants';
import { getSearchParamsString } from '../misc';

export const fetchCampgrounds = async (props: CampgroundsFilterDto): PaginatedApiResponse<Campground> => {
  try {
    const searchParamsString = getSearchParamsString<CampgroundsFilterDto>(props);

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

export const fetchCampground = async (slug: string): ApiResponse<Campground> => {
  try {
    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}/${slug}`);
    if (!response.ok) {
      return { error: 'Failed to fetch a campground' };
    }

    const result: Campground = await response.json();

    return { result };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch a campground';
    return { error: errorMessage };
  }
};
