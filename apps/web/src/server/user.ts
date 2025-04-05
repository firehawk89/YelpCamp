'use server';

import { ApiError } from '@/types/api';
import { User } from '@/types/user';
import { API_ROUTES, USER_ID_PARAM } from '@/utils/constants';

import { getAccessToken } from './session';

export const fetchUser = async (userId: string): Promise<User> => {
  const accessToken = await getAccessToken();
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
