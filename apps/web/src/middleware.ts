import { NextRequest } from 'next/server';

import { authMiddleware } from './middlewares/auth';
import i18nMiddleware from './middlewares/i18n';

export async function middleware(request: NextRequest) {
  const i18nResponse = i18nMiddleware(request);
  if (!i18nResponse?.ok) return i18nResponse;

  const authResponse = await authMiddleware(request, i18nResponse);
  return authResponse;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|favicon.ico|sitemap.xml|robots.txt)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
