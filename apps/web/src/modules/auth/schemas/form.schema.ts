import { TFunction } from '@/types/misc';
import { z } from 'zod';

import { getPasswordSchema } from './password.schema';

export const getAuthFormSchema = (t: TFunction) =>
  z
    .object({
      email: z
        .string({ required_error: t('pages.auth.form.email.errors.required') })
        .email({ message: t('pages.auth.form.email.errors.invalid') }),
      password: getPasswordSchema(t),
    })
    .required();

export type AuthFormFields = z.infer<ReturnType<typeof getAuthFormSchema>>;
