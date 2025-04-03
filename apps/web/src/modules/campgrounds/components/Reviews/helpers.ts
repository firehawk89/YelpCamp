import {
  MAX_RATING,
  MIN_REVIEW_TITLE_LENGTH,
  MAX_REVIEW_TITLE_LENGTH,
  MAX_REVIEW_BODY_LENGTH,
  MIN_RATING,
  MIN_REVIEW_BODY_LENGTH,
} from '@/utils/constants';
import { z } from 'zod';

export const reviewFormSchema = z
  .object({
    title: z
      .string()
      .max(MAX_REVIEW_TITLE_LENGTH, { message: `Title must be at most 100 characters long` })
      .refine((val) => !val || val.length >= MIN_REVIEW_TITLE_LENGTH, {
        message: `Title must be at least ${MIN_REVIEW_TITLE_LENGTH} characters long`,
      }),
    body: z
      .string({ required_error: 'Review body is required' })
      .min(MIN_REVIEW_BODY_LENGTH, {
        message: `Review body must be at least ${MIN_REVIEW_BODY_LENGTH} characters long`,
      })
      .max(MAX_REVIEW_BODY_LENGTH, {
        message: `Review body must be at most ${MAX_REVIEW_BODY_LENGTH} characters long`,
      }),
    rating: z
      .number({ required_error: 'Rating is required' })
      .min(MIN_RATING, {
        message: `Rating must be at least ${MIN_RATING}`,
      })
      .max(MAX_RATING, {
        message: `Rating must be at most ${MAX_RATING}`,
      }),
  })
  .required();

export type ReviewFormFields = z.infer<typeof reviewFormSchema>;
