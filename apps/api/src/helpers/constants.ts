import { SortOrder } from 'src/types/api';

export const DEFAULT_PAGE: number = 1;
export const DEFAULT_PAGE_LIMIT: number = 4;

export const MIN_RATING: number = 1;
export const MAX_RATING: number = 5;

export const DEFAULT_SORT_FIELD = 'createdAt';
export const DEFAULT_SORT_ORDER: SortOrder = 'desc';

export const ACCESS_TOKEN_EXPIRATION_SECONDS = 60 * 15;
export const REFRESH_TOKEN_EXPIRATION_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
export const REFRESH_TOKEN_EXPIRY_DATE = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_MILLISECONDS);
