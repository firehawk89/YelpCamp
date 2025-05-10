import config from '@/app/config';

export const API_URL = config.api.url;

export const API_ROUTES = {
  AUTH: `${API_URL}/auth`,
  CAMPGROUNDS: `${API_URL}/campgrounds`,
  USERS: `${API_URL}/users`,
  REVIEWS: `${API_URL}/reviews`,
  IMAGES: `${API_URL}/images`,
};

export const NEXT_TAGS = {
  USER: 'user',
  REVIEWS: 'reviews',
  CAMPGROUNDS: 'campgrounds',
  CAMPGROUND_LOCATIONS: 'campground-locations',
  FAVORITE_CAMPGROUNDS: 'favorite-campgrounds',
};
