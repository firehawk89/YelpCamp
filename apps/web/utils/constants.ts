export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES: Record<string, string> = {
  CAMPGROUNDS: `${API_URL}/campgrounds`,
};

export const SEARCH_PARAM: string = 'search';
export const PAGE_PARAM: string = 'page';
export const SORT_BY_PARAM: string = 'sortBy';
export const SORT_ORDER_PARAM: string = 'sortOrder';

export const MAX_SHOWN_PAGES: number = 3;
export const DEFAULT_PAGE: number = 1;
