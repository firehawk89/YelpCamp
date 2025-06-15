import { defineRouting } from 'next-intl/routing';

export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = [DEFAULT_LOCALE, 'uk'];

export const routing = defineRouting({
  defaultLocale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
});
