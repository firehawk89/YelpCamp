import { defineRouting } from 'next-intl/routing';

const supportedLocales = ['en', 'uk'];
const defaultLocale = 'en';

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale,
});
