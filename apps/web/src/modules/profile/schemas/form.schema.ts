import { MAX_USER_NAME_LENGTH, MIN_USER_NAME_LENGTH } from '@repo/constants';
import { z } from 'zod';

export const personalInfoFormSchema = z
  .object({
    firstName: z
      .string()
      .min(MIN_USER_NAME_LENGTH, { message: `First name must be at least ${MIN_USER_NAME_LENGTH} characters long` })
      .max(MAX_USER_NAME_LENGTH, { message: `First name must be at most ${MAX_USER_NAME_LENGTH} characters long` })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val === '' ? null : val)),
    lastName: z
      .string()
      .min(MIN_USER_NAME_LENGTH, { message: `Last name must be at least ${MIN_USER_NAME_LENGTH} characters long` })
      .max(MAX_USER_NAME_LENGTH, { message: `Last name must be at most ${MAX_USER_NAME_LENGTH} characters long` })
      .optional()
      .or(z.literal(''))
      .transform((val) => (val === '' ? null : val)),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
  })
  .required();

export type PersonalInfoFormFields = z.infer<typeof personalInfoFormSchema>;
