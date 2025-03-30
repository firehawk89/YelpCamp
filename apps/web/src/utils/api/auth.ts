'use server';

import { AuthFormFields } from '@/modules/auth/helpers';
import { ApiError } from '@/types/api';
import { UserTokens } from '@/types/user';
import { cookies } from 'next/headers';

import { ACCESS_TOKEN_COOKIE_NAME, API_ROUTES } from '../constants';
import { decryptToken, deleteSessionCookies, setSessionCookies } from '../session';

type LogoutResponse = {
  message: string;
};

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

export const logout = async (): Promise<LogoutResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    throw new Error('Failed to log out - access token is missing');
  }

  const { userId } = await decryptToken(accessToken);

  const response = await fetch(`${API_ROUTES.AUTH}/log-out`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ userId }),
  });

  const data: LogoutResponse | ApiError = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiError).message || 'Failed to log out');
  }

  await deleteSessionCookies();

  return { message: data.message } as LogoutResponse;
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
