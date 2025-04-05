'use server';

import config from '@/app/config';
import { UserTokens } from '@/types/user';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { fetchUser } from './api/user';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from './constants';

type JWTPayload = {
  userId: string;
};

const encodedSecret = new TextEncoder().encode(config.jwt.secret);

export const setSessionCookies = async (tokens: UserTokens) => {
  const cookieStore = await cookies();

  const tokenCookiesConfig = [
    {
      name: ACCESS_TOKEN_COOKIE_NAME,
      value: tokens.accessToken,
      httpOnly: true,
      secure: true,
    },
    {
      name: REFRESH_TOKEN_COOKIE_NAME,
      value: tokens.refreshToken,
      httpOnly: true,
      secure: true,
    },
  ];

  tokenCookiesConfig.forEach((tokenCookieConfig) => {
    cookieStore.set(tokenCookieConfig);
  });
};

export const deleteSessionCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
};

export const decryptToken = async (token: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify<JWTPayload>(token, encodedSecret);
    return payload;
  } catch {
    console.error('Failed to validate the access token');
    return { userId: '' };
  }
};

const getUserFromToken = async (token: string) => {
  const { userId } = await decryptToken(token);
  if (!userId) return null;
  const user = await fetchUser(userId);
  return user;
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  return accessToken;
};

export const getSessionUser = async () => {
  const accessToken = await getAccessToken();
  if (accessToken) return getUserFromToken(accessToken);
  return null;
};
