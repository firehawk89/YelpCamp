import { getPasswordSchema } from '@/modules/auth/schemas/password.schema';
import { TFunction } from '@/types/misc';
import { z } from 'zod';

// TODO: Remove unnecessary validation from old and confirmed password
export const getChangePasswordFormSchema = (t: TFunction) =>
  z
    .object({
      oldPassword: getPasswordSchema(t, t('changePassword.oldPassword')),
      newPassword: getPasswordSchema(t, t('changePassword.newPassword')),
      confirmedNewPassword: getPasswordSchema(t, t('changePassword.confirmedNewPassword')),
    })
    .refine((data) => data.newPassword === data.confirmedNewPassword, {
      message: t('changePassword.errors.newPasswordMustMatchConfirmed'),
      path: ['confirmedNewPassword'],
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: t('changePassword.errors.newPasswordCannotBeTheSameAsOld'),
      path: ['newPassword'],
    });

export type ChangePasswordFormFields = z.infer<ReturnType<typeof getChangePasswordFormSchema>>;
