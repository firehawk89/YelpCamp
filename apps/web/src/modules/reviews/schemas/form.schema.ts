import { TFunction } from '@/types/misc';
import {
  MAX_REVIEW_BODY_LENGTH,
  MAX_REVIEW_RATING,
  MAX_REVIEW_TITLE_LENGTH,
  MIN_REVIEW_BODY_LENGTH,
  MIN_REVIEW_RATING,
  MIN_REVIEW_TITLE_LENGTH,
} from '@repo/constants';
import { z } from 'zod';

export const getReviewFormSchema = (t: TFunction) =>
  z
    .object({
      title: z
        .string()
        .min(MIN_REVIEW_TITLE_LENGTH, {
          message: t('pages.campground.reviews.form.title.errors.minLength', {
            minLength: MIN_REVIEW_TITLE_LENGTH,
          }),
        })
        .max(MAX_REVIEW_TITLE_LENGTH, {
          message: t('pages.campground.reviews.form.title.errors.maxLength', {
            maxLength: MAX_REVIEW_TITLE_LENGTH,
          }),
        })
        .optional()
        .or(z.literal('')) // Treat empty string as null
        .transform((val) => (val === '' ? null : val)),

      body: z
        .string({ required_error: t('pages.campground.reviews.form.body.errors.required') })
        .min(MIN_REVIEW_BODY_LENGTH, {
          message: t('pages.campground.reviews.form.body.errors.minLength', {
            minLength: MIN_REVIEW_BODY_LENGTH,
          }),
        })
        .max(MAX_REVIEW_BODY_LENGTH, {
          message: t('pages.campground.reviews.form.body.errors.maxLength', {
            maxLength: MAX_REVIEW_BODY_LENGTH,
          }),
        }),

      rating: z
        .number({ required_error: t('pages.campground.reviews.form.rating.errors.required') })
        .min(MIN_REVIEW_RATING, {
          message: t('pages.campground.reviews.form.rating.errors.minRating', {
            minRating: MIN_REVIEW_RATING,
          }),
        })
        .max(MAX_REVIEW_RATING, {
          message: t('pages.campground.reviews.form.rating.errors.maxRating', {
            maxRating: MAX_REVIEW_RATING,
          }),
        }),
    })
    .required();

export type ReviewFormFields = z.infer<ReturnType<typeof getReviewFormSchema>>;
