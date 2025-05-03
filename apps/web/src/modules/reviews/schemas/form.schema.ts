import {
  MAX_REVIEW_BODY_LENGTH,
  MAX_REVIEW_RATING,
  MAX_REVIEW_TITLE_LENGTH,
  MIN_REVIEW_BODY_LENGTH,
  MIN_REVIEW_RATING,
  MIN_REVIEW_TITLE_LENGTH,
} from '@repo/constants';
import { z } from 'zod';

export const reviewFormSchema = z
  .object({
    title: z
      .string()
      .min(MIN_REVIEW_TITLE_LENGTH, {
        message: `Title must be at least ${MIN_REVIEW_TITLE_LENGTH} characters long`,
      })
      .max(MAX_REVIEW_TITLE_LENGTH, {
        message: `Title must be at most ${MAX_REVIEW_TITLE_LENGTH} characters long`,
      })
      .optional()
      .or(z.literal('')) // Treat empty string as null
      .transform((val) => (val === '' ? null : val)),

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
      .min(MIN_REVIEW_RATING, {
        message: `Rating must be at least ${MIN_REVIEW_RATING}`,
      })
      .max(MAX_REVIEW_RATING, {
        message: `Rating must be at most ${MAX_REVIEW_RATING}`,
      }),
  })
  .required();

export type ReviewFormFields = z.infer<typeof reviewFormSchema>;
