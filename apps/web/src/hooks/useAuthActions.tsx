'use client';

import { routes } from '@/app/routes';
import { AuthFormFields } from '@/modules/auth/helpers';
import { logout, signIn, signUp } from '@/server/auth';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface Options<T> {
  onSignIn?: (formData: T) => void;
  onSignUp?: (formData: T) => void;
  onLogout?: () => void;
}

const useAuthActions = <T extends AuthFormFields>({ onSignIn, onSignUp, onLogout }: Options<T> = {}) => {
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);

  const handleSignIn = useCallback(
    async (formData: T) => {
      try {
        await signIn(formData);
        onSignIn?.(formData);
        router.replace(routes.campgrounds());
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An error occurred while signing in.'));
      }
    },
    [onSignIn, router]
  );

  const handleSignUp = useCallback(
    async (formData: T) => {
      try {
        await signUp(formData);
        onSignUp?.(formData);
        router.replace(routes.campgrounds());
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An error occurred while signing up.'));
      }
    },
    [onSignUp, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      onLogout?.();
      router.replace(routes.campgrounds());
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred while logging out.'));
    }
  }, [onLogout, router]);

  return { error, handleSignIn, handleSignUp, handleLogout };
};

export default useAuthActions;
