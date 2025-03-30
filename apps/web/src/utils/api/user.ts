'use server';

import { ApiError } from '@/types/api';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

import { ACCESS_TOKEN_COOKIE_NAME, API_ROUTES, USER_ID_PARAM } from '../constants';

export const fetchUser = async (userId: string): Promise<User> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    throw new Error('Failed to fetch a user - access token is missing');
  }

  const response = await fetch(`${API_ROUTES.USERS}?${USER_ID_PARAM}=${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data: User | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to fetch a user');
  }

  return data as User;
};
