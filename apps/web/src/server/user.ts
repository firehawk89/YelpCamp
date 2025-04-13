'use server';

import { ApiError } from '@/types/api';
import { User } from '@/types/user';
import { API_ROUTES } from '@/utils/constants/misc';
import { USER_ID_PARAM } from '@/utils/constants/params';
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
