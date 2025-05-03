import type { NextRequest } from 'next/server';

import { routes } from '@/app/routes';
import { refreshTokens } from '@/server/auth';
import { decryptToken } from '@/server/session';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRATION_DATE,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRATION_DATE,
} from '@/utils/constants/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const publicRoutes = [routes.signIn(), routes.signUp];
const protectedRoutes = [routes.profile(), routes.campgrounds.new()];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken && !refreshToken) {
    if (isProtectedRoute) {
      const url = new URL(routes.signIn(), request.nextUrl);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  const accessTokenData = await decryptToken(accessToken);

  if (accessTokenData?.userId) {
    if (isPublicRoute) {
      const url = new URL(routes.campgrounds.all(), request.nextUrl);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!accessTokenData?.userId && refreshToken) {
    const newTokens = await refreshTokens(refreshToken);

    const response = NextResponse.next();

    response.cookies.set(ACCESS_TOKEN_COOKIE_NAME, newTokens.accessToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      expires: ACCESS_TOKEN_EXPIRATION_DATE,
    });

    response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, newTokens.refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      expires: REFRESH_TOKEN_EXPIRATION_DATE,
    });

    return response;
  }

  return NextResponse.next();
}
