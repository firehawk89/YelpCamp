'use server';

import { ApiError, PaginatedApiResponse, PaginatedResponse } from '@/types/api';
import { Campground, CampgroundsFilterDto } from '@/types/campground';
import { Review, ReviewsFilterDto } from '@/types/review';
import { User } from '@/types/user';
import { API_ROUTES } from '@/utils/constants/misc';
import { USER_ID_PARAM } from '@/utils/constants/params';
import { getSearchParamsString } from '@/utils/misc';
import { revalidateTag } from 'next/cache';

import { getAccessToken } from './session';

export const fetchUser = async (userId: string): Promise<User> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Failed to fetch a user - access token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}?${USER_ID_PARAM}=${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { tags: ['user'] },
  });

  const data: User | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to fetch a user');
  }

  return data as User;
};

export const fetchUserReviews = async (userId: string, filters?: ReviewsFilterDto): PaginatedApiResponse<Review> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to fetch user reviews - access token is missing');
    }

    let searchParamsString = '';

    if (filters) {
      searchParamsString = getSearchParamsString(filters);
    }

    const response = await fetch(
      `${API_ROUTES.USERS}/${userId}/reviews${searchParamsString ? `?${searchParamsString}` : ''}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { tags: ['user'] },
      }
    );

    const data: PaginatedResponse<Review> | ApiError = await response.json();

    if (!response.ok || 'error' in data) {
      throw new Error((data as ApiError).message || 'Failed to fetch user reviews');
    }

    return { result: data as PaginatedResponse<Review> };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user reviews';
    return { error: errorMessage };
  }
};

export const updateUserAvatar = async (userId: string, avatar: string): Promise<User> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Failed to update user avatar - access token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ avatar }),
  });

  const data: User | ApiError = await response.json();
  revalidateTag('user');

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to update user avatar');
  }

  return data as User;
};

export const addFavoriteCampground = async (campgroundId: string): Promise<User> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Failed to add favorite campground - access token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}/favorites/campgrounds`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ campgroundId }),
  });

  const data: User | ApiError = await response.json();
  revalidateTag('user');

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to add favorite campground');
  }

  return data as User;
};

export const removeFavoriteCampground = async (campgroundId: string): Promise<User> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('Failed to remove favorite campground - access token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}/favorites/campgrounds`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ campgroundId }),
  });

  const data: User | ApiError = await response.json();
  revalidateTag('user');

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to remove favorite campground');
  }

  return data as User;
};

export const fetchUserFavoriteCampgrounds = async (filter?: CampgroundsFilterDto): PaginatedApiResponse<Campground> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to get user favorite campgrounds - access token is missing');
    }

    const searchParamsString = filter ? getSearchParamsString<CampgroundsFilterDto>(filter) : '';

    const response = await fetch(
      `${API_ROUTES.USERS}/favorites/campgrounds${searchParamsString ? `?${searchParamsString}` : ''}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data: PaginatedResponse<Campground> | ApiError = await response.json();

    if (!response.ok || 'error' in data) {
      throw new Error((data as ApiError).message || 'Failed to get user favorite campgrounds');
    }

    return { result: data as PaginatedResponse<Campground> };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get user favorite campgrounds';
    return { error: errorMessage };
  }
};
