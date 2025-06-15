import { DEFAULT_LOCALE } from '@/i18n/routing';

export const formatDate = (
  date: Date,
  locales: Intl.LocalesArgument = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
) => new Intl.DateTimeFormat(locales, options).format(date);
