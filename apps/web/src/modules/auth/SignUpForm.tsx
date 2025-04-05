'use client';

import { signUp } from '@/utils/api/auth';
import { cn } from '@/utils/misc';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@repo/ui/alert';
import Button from '@repo/ui/button';
import Card, { CardProps } from '@repo/ui/card';
import Divider from '@repo/ui/divider';
import Input from '@repo/ui/input';
import InputWrapper from '@repo/ui/input-wrapper';
import PasswordInput from '@repo/ui/password-input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthFormFields, authFormSchema } from './helpers';

const SignUpForm = ({ className, ...props }: CardProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormFields>({ resolver: zodResolver(authFormSchema) });

  const [signUpError, setSignUpError] = useState<Error | null>(null);

  const onSubmit: SubmitHandler<AuthFormFields> = async (formData) => {
    try {
      await signUp(formData);
      router.replace('/campgrounds');
    } catch (error) {
      if (error instanceof Error) {
        setSignUpError(error);
      }
      setSignUpError(new Error('An error occurred while signing up.'));
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {signUpError && (
        <Alert className="w-full max-w-96" color="danger">
          {signUpError.message}
        </Alert>
      )}

      <Card className={cn('w-full max-w-96 gap-3', className)} orientation="vertical" {...props}>
        <h1 className="text-xl font-semibold">Sign Up</h1>

        <Divider />

        <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper label="Email" inputId="email" error={errors.email?.message}>
            <Input {...register('email')} id="email" type="text" />
          </InputWrapper>

          <InputWrapper label="Password" inputId="password" error={errors.password?.message}>
            <PasswordInput {...register('password')} id="password" />
          </InputWrapper>

          <Button className="mt-1.5" variant="accent" disabled={isSubmitting} type="submit">
            Sign Up
          </Button>

          <p className="mt-1 text-center">
            Already with us?{' '}
            <Link className="text-accent ml-1 hover:underline" href="/sign-in">
              Sign In!
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
