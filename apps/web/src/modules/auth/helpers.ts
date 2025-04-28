import { MIN_PASSWORD_LENGTH } from '@/utils/constants/validation';
import { z } from 'zod';

export const getPasswordSchema = (passwordLabel: string = 'Password') =>
  z
    .string()
    .min(MIN_PASSWORD_LENGTH, { message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` })
    .regex(/[a-z]/, { message: `${passwordLabel} must contain at least one lowercase letter` })
    .regex(/[A-Z]/, { message: `${passwordLabel} must contain at least one uppercase letter` })
    .regex(/[0-9]/, { message: `${passwordLabel} must contain at least one number` });

export const authFormSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: getPasswordSchema(),
  })
  .required();

export type AuthFormFields = z.infer<typeof authFormSchema>;
