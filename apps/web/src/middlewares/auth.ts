import type { NextRequest } from 'next/server';

import { routes } from '@/app/routes';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/utils/constants/auth';
import { API_ROUTES } from '@/utils/constants/misc';
import { RETURN_TO_PARAM } from '@/utils/constants/params';
import { ACCESS_TOKEN_EXPIRATION_MILLISECONDS, REFRESH_TOKEN_EXPIRATION_MILLISECONDS } from '@repo/constants';
import { UserTokens } from '@repo/types';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { decryptToken, deleteSessionCookies } from '../server/session';

const publicRoutes = [routes.signIn(), routes.signUp];
const protectedRoutes = [routes.profile(), routes.campgrounds.new()];

const protectedRoutePatterns = [
  /^\/[\w-]+\/[\w-]+\/edit$/, // matches any /{resource}/{id}/edit pattern (e.g. edit pages)
];

const getBasePathname = (path: string) => {
  const pathSegments = path.split('/');
  return `/${pathSegments.slice(2).join('/')}`;
};

const refreshTokensInMiddleware = async (refreshToken: string): Promise<UserTokens | null> => {
  try {
    const locale = await getLocale();

    const response = await fetch(`${API_ROUTES.AUTH}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept-Language': locale },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as UserTokens;

    return data;
  } catch {
    return null;
  }
};

export async function authMiddleware(request: NextRequest, response: NextResponse) {
  const path = request.nextUrl.pathname;
  const basePathname = getBasePathname(path);

  const isPublicRoute = publicRoutes.includes(basePathname);
  const isProtectedRoute =
    protectedRoutes.includes(basePathname) || protectedRoutePatterns.some((pattern) => pattern.test(basePathname));

  const cookieStore = await cookies();

  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken && !refreshToken) {
    if (isProtectedRoute) {
      const url = new URL(routes.signIn(), request.nextUrl);
      url.searchParams.set(RETURN_TO_PARAM, request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return response;
  }

  const accessTokenData = await decryptToken(accessToken);

  if (accessTokenData?.userId) {
    if (isPublicRoute) {
      const url = new URL(routes.campgrounds.all(), request.nextUrl);
      return NextResponse.redirect(url);
    }

    return response;
  }

  if (!accessTokenData?.userId && refreshToken) {
    const newTokens = await refreshTokensInMiddleware(refreshToken);

    if (!newTokens) {
      await deleteSessionCookies();

      if (isProtectedRoute) {
        const url = new URL(routes.signIn(), request.nextUrl);
        url.searchParams.set(RETURN_TO_PARAM, request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }

      return response;
    }

    const newResponse = NextResponse.next();
    const now = Date.now();

    newResponse.cookies.set(ACCESS_TOKEN_COOKIE_NAME, newTokens.accessToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(now + ACCESS_TOKEN_EXPIRATION_MILLISECONDS),
    });

    newResponse.cookies.set(REFRESH_TOKEN_COOKIE_NAME, newTokens.refreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(now + REFRESH_TOKEN_EXPIRATION_MILLISECONDS),
    });

    const newAccessTokenData = await decryptToken(newTokens.accessToken);

    if (newAccessTokenData?.userId && isPublicRoute) {
      const url = new URL(routes.campgrounds.all(), request.nextUrl);
      return NextResponse.redirect(url);
    }

    return newResponse;
  }

  return response;
}
