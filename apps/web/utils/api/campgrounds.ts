'use server';

import { Campground } from 'types/campground';

import { API_ROUTES, ApiResponse } from '.';

export const fetchCampgrounds = async (): ApiResponse<Campground[]> => {
  try {
    const response = await fetch(API_ROUTES.CAMPGROUNDS);

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
