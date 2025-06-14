'use client';

import useAuthActions from '@/hooks/useAuthActions';
import { RETURN_TO_PARAM } from '@/utils/constants/params';
import { cn } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@repo/ui/alert';
import Button from '@repo/ui/button';
import Card, { CardProps } from '@repo/ui/card';
import Divider from '@repo/ui/divider';
import Input from '@repo/ui/input';
import InputWrapper from '@repo/ui/input-wrapper';
import PasswordInput from '@repo/ui/password-input';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { AuthFormFields, getAuthFormSchema } from '../schemas/form.schema';

interface SignUpFormProps extends CardProps {
  returnTo?: string;
}

const SignUpForm = ({ returnTo, className, ...props }: SignUpFormProps) => {
  const t = useTranslations('pages.auth.signUp');
  const tZod = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormFields>({ resolver: zodResolver(getAuthFormSchema(tZod)) });

  const { handleSignUp, error } = useAuthActions();

  return (
    <div className="flex flex-col items-center gap-5">
      {error && (
        <Alert className="w-full max-w-96" color="danger">
          {error.message}
        </Alert>
      )}

      <Card className={cn('w-full max-w-96 gap-3', className)} orientation="vertical" {...props}>
        <h1 className="text-xl font-semibold">{t('title')}</h1>

        <Divider />

        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit(handleSignUp)}>
          <InputWrapper label={t('form.email.label')} inputId="email" error={errors.email?.message}>
            <Input {...register('email')} id="email" type="text" />
          </InputWrapper>

          <InputWrapper label={t('form.password.label')} inputId="password" error={errors.password?.message}>
            <PasswordInput {...register('password')} id="password" />
          </InputWrapper>

          <Button className="mt-1.5" type="submit" isLoading={isSubmitting} variant="accent">
            {t('actions.signUp')}
          </Button>

          <p className="mt-1 text-center">
            {t('haveAccount')}
            <Link
              className="text-accent ml-1 hover:underline"
              href={returnTo ? `/sign-in?${RETURN_TO_PARAM}=${encodeURIComponent(returnTo)}` : '/sign-in'}
            >
              {t('actions.signIn')}
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
