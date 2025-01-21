'use client';

import { cn } from '@/utils/misc';
import Button, { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

export enum ErrorType {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500
}

interface AppErrorProps extends HTMLAttributes<HTMLDivElement> {
  code?: number;
  title: string;
  message: string;
  onTryAgain?: () => void;
}

const AppError: FC<AppErrorProps> = ({
  className,
  code = ErrorType.InternalServerError,
  title,
  message,
  onTryAgain
}) => {
  return (
    <div className={cn('flex-1 flex flex-col justify-center items-center gap-6 text-center', className)}>
      <div className="text-center">
        {code && <span className="text-[5rem] md:text-[8rem] leading-none">{code}</span>}
        <h1 className="text-xl md:text-3xl font-medium">{title}</h1>
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
