import { TFunction } from '@/types/misc';
import { MAX_USER_NAME_LENGTH, MIN_USER_NAME_LENGTH } from '@repo/constants';
import { z } from 'zod';

export const getPersonalInfoFormSchema = (t: TFunction) =>
  z
    .object({
      firstName: z
        .string()
        .min(MIN_USER_NAME_LENGTH, {
          message: t('pages.profile.personalInfo.form.errors.firstName.minLength', {
            min: MIN_USER_NAME_LENGTH,
          }),
        })
        .max(MAX_USER_NAME_LENGTH, {
          message: t('pages.profile.personalInfo.form.errors.firstName.maxLength', { max: MAX_USER_NAME_LENGTH }),
        })
        .optional()
        .or(z.literal(''))
        .transform((val) => (val === '' ? null : val)),
      lastName: z
        .string()
        .min(MIN_USER_NAME_LENGTH, {
          message: t('pages.profile.personalInfo.form.errors.lastName.minLength', {
            min: MIN_USER_NAME_LENGTH,
          }),
        })
        .max(MAX_USER_NAME_LENGTH, {
          message: t('pages.profile.personalInfo.form.errors.lastName.maxLength', { max: MAX_USER_NAME_LENGTH }),
        })
        .optional()
        .or(z.literal(''))
        .transform((val) => (val === '' ? null : val)),
      email: z
        .string()
        .email({ message: t('pages.profile.personalInfo.form.errors.email.invalid') })
        .optional(),
    })
    .required();

export type PersonalInfoFormFields = z.infer<ReturnType<typeof getPersonalInfoFormSchema>>;
