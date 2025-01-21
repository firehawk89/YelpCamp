'use client';

import AppError, { ErrorType } from '@/components/shared/AppError';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  console.error('error', error);

  return (
    <AppError
      code={ErrorType.InternalServerError}
      title="Something went wrong!"
      message={error.message}
      onTryAgain={reset}
    />
  );
}
