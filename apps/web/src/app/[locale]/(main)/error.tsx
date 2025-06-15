'use client';

import AppError, { ErrorType } from '@/components/AppError';
import { useTranslations } from 'next-intl';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const t = useTranslations('pages.error');

  console.error('error', error);

  return (
    <AppError code={ErrorType.InternalServerError} title={t('title')} message={error.message} onTryAgain={reset} />
  );
}
