import { TFunction } from '@/types/misc';
import { MIN_PASSWORD_LENGTH } from '@repo/constants';
import { z } from 'zod';

export const getPasswordSchema = (t: TFunction, passwordLabel?: string) => {
  const label = passwordLabel || t('pages.auth.form.password.label');

  return z
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      message: t('pages.auth.form.password.errors.length', { label, minLength: MIN_PASSWORD_LENGTH }),
    })
    .regex(/[a-z]/, {
      message: t('pages.auth.form.password.errors.lowercase', { label }),
    })
    .regex(/[A-Z]/, {
      message: t('pages.auth.form.password.errors.uppercase', { label }),
    })
    .regex(/[0-9]/, {
      message: t('pages.auth.form.password.errors.number', { label }),
    });
};
