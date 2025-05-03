'use server';

import { Campground, CampgroundsFilterDto, CreateCampgroundDTO } from '@/types/campground';
import { API_ROUTES, NEXT_TAGS } from '@/utils/constants/misc';
import { getSearchParamsString } from '@/utils/misc';
import { ApiError, ApiResponse, PaginatedApiResponse, PaginatedResponse } from '@repo/types';
import { revalidateTag } from 'next/cache';

import { getAccessToken } from './session';

export const fetchCampgrounds = async (filter: CampgroundsFilterDto): PaginatedApiResponse<Campground> => {
  try {
    const searchParamsString = getSearchParamsString<CampgroundsFilterDto>(filter);

    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}${searchParamsString ? `?${searchParamsString}` : ''}`, {
      next: { tags: [NEXT_TAGS.CAMPGROUNDS] },
    });

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

export const createCampground = async (campgroundData: CreateCampgroundDTO): Promise<Campground> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to create campground - access token is missing');
    }

    const response = await fetch(API_ROUTES.CAMPGROUNDS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(campgroundData),
    });

    if (!response.ok) {
      const data: ApiError = await response.json();
      throw new Error(data.message || 'Failed to create campground');
    }

    const data: Campground = await response.json();
    revalidateTag(NEXT_TAGS.CAMPGROUNDS);

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to create campground';
    throw new Error(errorMessage);
  }
};
