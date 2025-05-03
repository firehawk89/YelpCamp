import {
  CAMPGROUND_SLUG_REGEX,
  MAX_CAMPGROUND_TITLE_LENGTH,
  MAX_REVIEW_BODY_LENGTH,
  MIN_CAMPGROUND_DESCRIPTION_LENGTH,
  MIN_CAMPGROUND_TITLE_LENGTH,
} from '@repo/constants';
import { z } from 'zod';

import { locationSchema } from './location.schema';
import { priceSchema } from './price.schema';
export const campgroundFormSchema = z
  .object({
    title: z
      .string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' })
      .min(MIN_CAMPGROUND_TITLE_LENGTH, {
        message: `Title must be at least ${MIN_CAMPGROUND_TITLE_LENGTH} characters long`,
      })
      .max(MAX_CAMPGROUND_TITLE_LENGTH, {
        message: `Title must be at most ${MAX_CAMPGROUND_TITLE_LENGTH} characters long`,
      }),

    includeSlug: z.boolean().default(false),

    slug: z
      .string()
      .min(MIN_CAMPGROUND_TITLE_LENGTH, {
        message: `Slug must be at least ${MIN_CAMPGROUND_TITLE_LENGTH} characters long`,
      })
      .max(MAX_CAMPGROUND_TITLE_LENGTH, {
        message: `Slug must be at most ${MAX_CAMPGROUND_TITLE_LENGTH} characters long`,
      })
      .regex(CAMPGROUND_SLUG_REGEX, {
        message: 'Slug must be in kebab-case (lowercase, hyphens only, no spaces or special characters)',
      })
      .optional(),

    price: priceSchema,

    description: z
      .string()
      .min(MIN_CAMPGROUND_DESCRIPTION_LENGTH, {
        message: `Description must be at least ${MIN_CAMPGROUND_DESCRIPTION_LENGTH} characters long`,
      })
      .max(MAX_REVIEW_BODY_LENGTH, {
        message: `Description must be at most ${MAX_REVIEW_BODY_LENGTH} characters long`,
      })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val === '' ? null : val)),

    location: locationSchema,
  })
  .superRefine((data, ctx) => {
    if (data.includeSlug && !data.slug) {
      ctx.addIssue({
        path: ['slug'],
        code: z.ZodIssueCode.custom,
        message: 'Slug is required if custom slug is enabled',
      });
    }
  });

export type CampgroundFormFields = z.infer<typeof campgroundFormSchema>;
