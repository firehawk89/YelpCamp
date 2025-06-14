import { TFunction } from '@/types/misc';
import { Messages } from 'next-intl';
import { z } from 'zod';

import { getPasswordSchema } from './password.schema';

export const getAuthFormSchema = (t: TFunction<Messages>) =>
  z
    .object({
      email: z
        .string({ required_error: t('pages.auth.signIn.form.email.required') })
        .email({ message: t('pages.auth.signIn.form.email.invalid') }),
      password: getPasswordSchema(),
    })
    .required();

export type AuthFormFields = z.infer<ReturnType<typeof getAuthFormSchema>>;
