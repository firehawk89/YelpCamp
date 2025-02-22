import { SortOrder } from 'src/types/api';

export const DEFAULT_PAGE: number = 1;
export const DEFAULT_PAGE_LIMIT: number = 4;

export const DEFAULT_SORT_FIELD = 'createdAt';
export const DEFAULT_SORT_ORDER: SortOrder = 'desc';

export const ACCESS_TOKEN_EXPIRATION_TIME: string | number = '15m';
export const REFRESH_TOKEN_EXPIRATION_DAYS: number = 7;
export const REFRESH_TOKEN_EXPIRATION_TIME = REFRESH_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
