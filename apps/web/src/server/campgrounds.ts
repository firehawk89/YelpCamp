'use server';

import { Campground, CampgroundLocation, CampgroundsFilterDto, CreateCampgroundDTO } from '@/types/campground';
import { API_ROUTES, NEXT_TAGS } from '@/utils/constants/misc';
import { getSearchParamsString } from '@/utils/misc';
import { ApiError, ApiResponse, PaginatedApiResponse, PaginatedResponse } from '@repo/types';
import { getLocale } from 'next-intl/server';
import { revalidateTag } from 'next/cache';

import { getAccessToken } from './session';

export const fetchCampgrounds = async (filter: CampgroundsFilterDto): PaginatedApiResponse<Campground> => {
  try {
    const locale = await getLocale();
    const searchParamsString = getSearchParamsString<CampgroundsFilterDto>(filter);

    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}${searchParamsString ? `?${searchParamsString}` : ''}`, {
      headers: { 'Accept-Language': locale },
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

export const fetchCampgroundLocations = async (filter: CampgroundsFilterDto): ApiResponse<CampgroundLocation[]> => {
  try {
    const locale = await getLocale();
    const searchParamsString = getSearchParamsString<CampgroundsFilterDto>(filter);

    const response = await fetch(
      `${API_ROUTES.CAMPGROUNDS}/locations${searchParamsString ? `?${searchParamsString}` : ''}`,
      {
        headers: { 'Accept-Language': locale },
        next: { tags: [NEXT_TAGS.CAMPGROUND_LOCATIONS] },
      }
    );

    if (!response.ok) {
      const data: ApiError = await response.json();
      throw new Error(data.message || 'Failed to fetch campground locations');
    }

    const result: CampgroundLocation[] = await response.json();

    return { result };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campground locations';
    return { error: errorMessage };
  }
};

export const fetchCampground = async (slugOrUrl: string): ApiResponse<Campground> => {
  try {
    const apiBaseUrl = API_ROUTES.CAMPGROUNDS;
    const url = slugOrUrl.startsWith(apiBaseUrl) ? slugOrUrl : `${apiBaseUrl}/${slugOrUrl}`;

    const locale = await getLocale();

    const response = await fetch(url, {
      headers: { 'Accept-Language': locale },
    });

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

    const locale = await getLocale();

    const response = await fetch(API_ROUTES.CAMPGROUNDS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': locale,
      },
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

export const updateCampground = async (
  campgroundId: string,
  campgroundData: CreateCampgroundDTO
): Promise<Campground> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to update campground - access token is missing');
    }

    const locale = await getLocale();

    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}/${campgroundId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': locale,
      },
      body: JSON.stringify(campgroundData),
    });

    if (!response.ok) {
      const data: ApiError = await response.json();
      throw new Error(data.message || 'Failed to update campground');
    }

    const data: Campground = await response.json();
    revalidateTag(NEXT_TAGS.CAMPGROUNDS);

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update campground';
    throw new Error(errorMessage);
  }
};

export const deleteCampground = async (campgroundId: string): Promise<Campground> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to delete campground - access token is missing');
    }

    const locale = await getLocale();

    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}/${campgroundId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': locale,
      },
    });

    if (!response.ok) {
      const data: ApiError = await response.json();
      throw new Error(data.message || 'Failed to delete campground');
    }

    const data: Campground = await response.json();
    revalidateTag(NEXT_TAGS.CAMPGROUNDS);

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to delete campground';
    throw new Error(errorMessage);
  }
};
