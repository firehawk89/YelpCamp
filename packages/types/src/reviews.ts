import { PaginationMetadata } from './api';

export interface ReviewsMetadata extends PaginationMetadata {
  positiveReviewsCount: number;
  recommendationPercentage: number;
}
