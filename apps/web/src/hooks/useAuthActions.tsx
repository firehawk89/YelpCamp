'use client';

import { routes } from '@/app/routes';
import { AuthFormFields } from '@/modules/auth/schemas/form.schema';
import { logout, signIn, signUp } from '@/server/auth';
import { RETURN_TO_PARAM } from '@/utils/constants/params';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface Options<T> {
  onSignIn?: (formData: T) => void;
  onSignUp?: (formData: T) => void;
  onLogout?: () => void;
}

const useAuthActions = <T extends AuthFormFields>({ onSignIn, onSignUp, onLogout }: Options<T> = {}) => {
  const t = useTranslations('authActions.errors');

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
        setError(error instanceof Error ? error : new Error(errorMessage || t('default')));
      }
    },
    [router, searchParams, t]
  );

  const handleSignIn = useCallback(
    (formData: T) => handleAuthAction(formData, signIn, onSignIn, t('signIn')),
    [handleAuthAction, onSignIn, t]
  );

  const handleSignUp = useCallback(
    (formData: T) => handleAuthAction(formData, signUp, onSignUp, t('signUp')),
    [handleAuthAction, onSignUp, t]
  );

  const handleLogout = useCallback(async () => {
    handleAuthAction(null, logout, onLogout, t('logout'));
  }, [handleAuthAction, onLogout, t]);

  return { error, handleSignIn, handleSignUp, handleLogout };
};

export default useAuthActions;
