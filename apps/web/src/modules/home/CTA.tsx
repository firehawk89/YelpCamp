import { routes } from '@/app/routes';
import { cn } from '@/utils/misc';
import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

const CTA = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('bg-accent/5 py-16', className)} {...props}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold">Ready to Start Your Adventure?</h2>

          <p className="max-w-2xl text-lg text-neutral-600">
            Join our community of campers and start exploring amazing campgrounds today.
          </p>

          <Link className={buttonVariants({ variant: 'accent', size: 'lg' })} href={routes.signUp()}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
