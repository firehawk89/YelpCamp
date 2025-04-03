import { ApiResponse } from '@/types/api';
import { Review } from '@/types/review';

import { API_ROUTES } from '../constants';

export const fetchCampgroundReviews = async (campgroundId: string): ApiResponse<Review[]> => {
  try {
    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}/${campgroundId}/reviews`);
    if (!response.ok) {
      return { error: 'Failed to fetch campground reviews' };
    }

    const result: Review[] = await response.json();

    return { result };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campground reviews';
    return { error: errorMessage };
  }
};
