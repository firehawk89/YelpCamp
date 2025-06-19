import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = {
    ...(await import(`./translations/${locale}/layout.json`)).default,
    ...(await import(`./translations/${locale}/pages.json`)).default,
    ...(await import(`./translations/${locale}/features.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
