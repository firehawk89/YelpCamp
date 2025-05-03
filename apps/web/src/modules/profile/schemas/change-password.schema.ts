import { getPasswordSchema } from '@/modules/auth/schemas/password.schema';
import { z } from 'zod';

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

export type ChangePasswordFormFields = z.infer<typeof changePasswordFormSchema>;
