'use server';

import { AuthFormFields } from '@/components/auth/helpers';
import { cookies } from 'next/headers';
import { User, UserTokens } from 'types/user';

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../constants';

const setCookie = async (cookieConfig: { name: string; value: string }) => {
  const { name, value } = cookieConfig;

  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    httpOnly: true,
    secure: true,
    path: '/',
  });
};

export const signIn = async (url: string, { arg }: { arg: AuthFormFields }): Promise<UserTokens> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign in a user');
  }

  setCookie({
    name: ACCESS_TOKEN_COOKIE_NAME,
    value: data.accessToken,
  });
  setCookie({
    name: REFRESH_TOKEN_COOKIE_NAME,
    value: data.refreshToken,
  });

  return data;
};

export const signUp = async (url: string, { arg }: { arg: AuthFormFields }): Promise<User> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign up a user');
  }

  return data;
};
