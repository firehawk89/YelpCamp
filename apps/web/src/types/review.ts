import { BasePaginationMetadata, CustomPaginatedApiResponse } from './api';
import { Campground } from './campground';
import { User } from './user';

export interface ReviewAuthor {
  _id: User['_id'];
  email: User['email'];
  avatar: User['avatar'];
}

export interface ReviewCampground {
  _id: Campground['_id'];
  title: Campground['title'];
  slug: Campground['slug'];
}

export interface Review {
  _id: string;
  title?: string;
  body: string;
  rating: number;
  campground: ReviewCampground;
  author: ReviewAuthor;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsFilterDto {
  page?: string;
}

export interface ReviewsMetadata extends BasePaginationMetadata {
  positiveReviewsCount: number;
  recommendationPercentage: number;
}

export type ReviewsApiResponse = CustomPaginatedApiResponse<Review, ReviewsMetadata>;
