import { DEFAULT_LOCALE } from '@repo/constants';
import { defineRouting } from 'next-intl/routing';

export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, 'uk'] as const;

export const routing = defineRouting({
  defaultLocale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
});
