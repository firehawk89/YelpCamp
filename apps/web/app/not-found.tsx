import { buttonVariants } from '@repo/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
      <div className="text-center">
        <span className="text-[5rem] md:text-[8rem] leading-none">404</span>
        <h1 className="text-xl md:text-3xl font-medium">Page not found</h1>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="md:text-lg">The page you are looking for does not exist or might have been removed</p>
        <Link className={buttonVariants({ variant: 'info' })} href="/">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
