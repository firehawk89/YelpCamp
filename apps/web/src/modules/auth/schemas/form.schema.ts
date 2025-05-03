import { z } from 'zod';

import { getPasswordSchema } from './password.schema';

export const authFormSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: getPasswordSchema(),
  })
  .required();

export type AuthFormFields = z.infer<typeof authFormSchema>;
