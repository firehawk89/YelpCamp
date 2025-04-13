export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
  AUTH: `${API_URL}/auth`,
  CAMPGROUNDS: `${API_URL}/campgrounds`,
  USERS: `${API_URL}/users`,
  REVIEWS: `${API_URL}/reviews`,
};

export const POSITIVE_RATING_THRESHOLD = 4;
export const POSITIVE_RATING_PERCENTAGE_THRESHOLD = 50;
