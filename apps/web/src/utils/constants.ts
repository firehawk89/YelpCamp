export const DEFAULT_LOCALE = 'en-US';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
  AUTH: `${API_URL}/auth`,
  CAMPGROUNDS: `${API_URL}/campgrounds`,
  USERS: `${API_URL}/users`,
  REVIEWS: `${API_URL}/reviews`,
};

export const SEARCH_PARAM: string = 'search';
export const PAGE_PARAM: string = 'page';
export const SORT_BY_PARAM: string = 'sortBy';
export const SORT_ORDER_PARAM: string = 'sortOrder';
export const USER_ID_PARAM: string = 'id';
export const RATING_PARAM: string = 'rating';

export const MAX_SHOWN_PAGES: number = 3;
export const DEFAULT_PAGE: number = 1;
export const MIN_RATING: number = 1;
export const MAX_RATING: number = 5;

export const MIN_AVATAR_DIMENSION = 400;
export const MAX_AVATAR_SIZE_KB = 512;

export const POSITIVE_RATING_THRESHOLD = 4;
export const POSITIVE_RATING_PERCENTAGE_THRESHOLD = 50;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export const ACCESS_TOKEN_EXPIRATION_DATE = new Date(Date.now() + 1000 * 60 * 15);
export const REFRESH_TOKEN_EXPIRATION_DATE = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

export const MIN_REVIEW_TITLE_LENGTH = 2;
export const MAX_REVIEW_TITLE_LENGTH = 100;
export const MIN_REVIEW_BODY_LENGTH = 10;
export const MAX_REVIEW_BODY_LENGTH = 1800;
