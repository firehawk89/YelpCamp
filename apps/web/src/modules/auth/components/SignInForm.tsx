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

interface SignInFormProps extends CardProps {
  returnTo?: string;
}

const SignInForm = ({ returnTo, className, ...props }: SignInFormProps) => {
  const t = useTranslations('pages.auth.signIn');
  const tZod = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormFields>({ resolver: zodResolver(getAuthFormSchema(tZod)) });

  const { handleSignIn, error } = useAuthActions();

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

        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit(handleSignIn)}>
          <InputWrapper label={t('form.email.label')} inputId="email" error={errors.email?.message}>
            <Input {...register('email')} id="email" type="text" />
          </InputWrapper>

          <InputWrapper
            label={t('form.password.label')}
            inputId="password"
            error={errors.password?.message}
            // TODO: Add forgot password logic
            // helperElement={
            //   <Link className="text-accent text-sm hover:underline" href="/forgot-password">
            //     Forgot Password?
            //   </Link>
            // }
          >
            <PasswordInput {...register('password')} id="password" />
          </InputWrapper>

          <Button className="mt-1.5" type="submit" isLoading={isSubmitting} variant="accent">
            {t('actions.signIn')}
          </Button>

          <p className="mt-1 text-center">
            {t('noAccount')}
            <Link
              className="text-accent ml-1 hover:underline"
              href={returnTo ? `/sign-up?${RETURN_TO_PARAM}=${encodeURIComponent(returnTo)}` : '/sign-up'}
            >
              {t('actions.signUp')}
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInForm;
