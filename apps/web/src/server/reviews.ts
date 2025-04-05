'use server';

import { ReviewFormFields } from '@/modules/campgrounds/components/Reviews/helpers';
import { ApiResponse } from '@/types/api';
import { Review } from '@/types/review';
import { API_ROUTES } from '@/utils/constants';
import { revalidateTag } from 'next/cache';

import { getAccessToken } from './session';

export const fetchCampgroundReviews = async (campgroundId: string): ApiResponse<Review[]> => {
  try {
    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}/${campgroundId}/reviews`, { next: { tags: ['reviews'] } });
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

export const createReview = async (campgroundId: string, reviewData: ReviewFormFields): Promise<Review> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to create a review. Please, sign in or sign up and try again');
    }

    const response = await fetch(`${API_ROUTES.CAMPGROUNDS}/${campgroundId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error('Failed to create a review. Please, try again later');
    }

    const review: Review = await response.json();
    revalidateTag('reviews');

    return review;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to create a review. Please, try again later';
    throw new Error(errorMessage);
  }
};

export const likeReview = async (reviewId: string): Promise<Review> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to like the review. Please, sign in or sign up and try again');
    }

    const response = await fetch(`${API_ROUTES.REVIEWS}/${reviewId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error('Failed to like the review. Please, sign in or sign up and try again');
    }

    const review: Review = await response.json();
    revalidateTag('reviews');

    return review;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to like the review. Please, try again later';
    throw new Error(errorMessage);
  }
};

export const unlikeReview = async (reviewId: string): Promise<Review> => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to unlike the review. Please, sign in or sign up and try again');
    }

    const response = await fetch(`${API_ROUTES.REVIEWS}/${reviewId}/like`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error('Failed to unlike the review. Please, try again later');
    }

    const review: Review = await response.json();
    revalidateTag('reviews');

    return review;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to unlike the review. Please, try again later';
    throw new Error(errorMessage);
  }
};
