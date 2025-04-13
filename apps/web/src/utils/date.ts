import { DEFAULT_LOCALE } from './constants/defaults';

export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
) => new Intl.DateTimeFormat(DEFAULT_LOCALE, options).format(date);
