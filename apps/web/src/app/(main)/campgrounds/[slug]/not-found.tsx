'use client';

import AppError, { ErrorType } from '@/components/AppError';

export default function NotFound() {
  return (
    <AppError
      code={ErrorType.NotFound}
      title="Campground not found"
      message="The campground you are looking for does not exist or might have been removed"
    />
  );
}
