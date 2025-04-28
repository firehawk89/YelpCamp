import { MAX_USER_NAME_LENGTH, MIN_USER_NAME_LENGTH } from '@/utils/constants/validation';
import { z } from 'zod';

import { getPasswordSchema } from '../auth/helpers';

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

export const changePasswordFormSchema = z
  .object({
    oldPassword: getPasswordSchema('Old Password'),
    newPassword: getPasswordSchema('New Password'),
    confirmedNewPassword: getPasswordSchema('Confirm New Password'),
  })
  .refine((data) => data.newPassword === data.confirmedNewPassword, {
    message: 'New password and confirmed new password must match',
    path: ['confirmedNewPassword'],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'New password cannot be the same as the old password',
    path: ['newPassword'],
  });

export type PersonalInfoFormFields = z.infer<typeof personalInfoFormSchema>;
export type ChangePasswordFormFields = z.infer<typeof changePasswordFormSchema>;
