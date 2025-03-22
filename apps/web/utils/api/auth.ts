'use server';

import { AuthFormFields } from '@/components/auth/helpers';
import { ApiError } from 'types/api';
import { UserTokens } from 'types/user';

import { API_ROUTES } from '../constants';
import { setSessionCookies } from '../session';

export const signIn = async (userData: AuthFormFields): Promise<UserTokens> => {
  const response = await fetch(`${API_ROUTES.AUTH}/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data: UserTokens | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to sign in a user');
  }

  await setSessionCookies(data as UserTokens);

  return data as UserTokens;
};

export const signUp = async (userData: AuthFormFields): Promise<UserTokens> => {
  const response = await fetch(`${API_ROUTES.AUTH}/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data: UserTokens | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to sign up a user');
  }

  await setSessionCookies(data as UserTokens);

  return data as UserTokens;
};

export const refreshTokens = async (refreshToken?: string): Promise<UserTokens> => {
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  const response = await fetch(`${API_ROUTES.AUTH}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data: UserTokens | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to refresh a token');
  }

  await setSessionCookies(data as UserTokens);

  return data as UserTokens;
};
