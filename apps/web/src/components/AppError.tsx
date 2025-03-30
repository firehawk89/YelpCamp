'use client';

import { cn } from '@/utils/misc';
import Button, { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

export enum ErrorType {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

interface AppErrorProps extends HTMLAttributes<HTMLDivElement> {
  code?: number;
  title: string;
  message: string;
  onTryAgain?: () => void;
}

const AppError = ({ className, code = ErrorType.InternalServerError, title, message, onTryAgain }: AppErrorProps) => {
  return (
    <div className={cn('flex flex-1 flex-col items-center justify-center gap-6 text-center', className)}>
      <div className="text-center">
        {code && <span className="text-[5rem] leading-none md:text-[8rem]">{code}</span>}
        <h1 className="text-xl font-medium md:text-3xl">{title}</h1>
      </div>
      <div className="flex flex-col items-center gap-6">
        <p className="md:text-lg">{message}</p>
        <div className="flex items-center gap-5">
          <Link className={buttonVariants({ variant: 'accent' })} href="/">
            Go to Homepage
          </Link>
          <Button onClick={onTryAgain} variant="info">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppError;
