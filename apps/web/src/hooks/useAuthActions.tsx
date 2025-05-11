'use client';

import { routes } from '@/app/routes';
import { AuthFormFields } from '@/modules/auth/schemas/form.schema';
import { logout, signIn, signUp } from '@/server/auth';
import { RETURN_TO_PARAM } from '@/utils/constants/params';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface Options<T> {
  onSignIn?: (formData: T) => void;
  onSignUp?: (formData: T) => void;
  onLogout?: () => void;
}

const useAuthActions = <T extends AuthFormFields>({ onSignIn, onSignUp, onLogout }: Options<T> = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<Error | null>(null);

  const handleAuthAction = useCallback(
    async (
      formData: T | null,
      action: (data: T) => Promise<unknown>,
      onSuccess?: (data: T) => void,
      errorMessage?: string
    ) => {
      setError(null);
      try {
        if (formData === null) {
          await action({} as T);
        } else {
          await action(formData);
          onSuccess?.(formData);
        }

        const returnTo = searchParams.get(RETURN_TO_PARAM);

        if (returnTo && returnTo.startsWith('/')) {
          router.replace(returnTo);
        } else {
          router.replace(routes.campgrounds.all());
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error(errorMessage || 'An error occurred.'));
      }
    },
    [router, searchParams]
  );

  const handleSignIn = useCallback(
    (formData: T) => handleAuthAction(formData, signIn, onSignIn, 'An error occurred while signing in.'),
    [handleAuthAction, onSignIn]
  );

  const handleSignUp = useCallback(
    (formData: T) => handleAuthAction(formData, signUp, onSignUp, 'An error occurred while signing up.'),
    [handleAuthAction, onSignUp]
  );

  const handleLogout = useCallback(async () => {
    handleAuthAction(null, logout, onLogout, 'An error occurred while logging out.');
  }, [handleAuthAction, onLogout]);

  return { error, handleSignIn, handleSignUp, handleLogout };
};

export default useAuthActions;
