import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { cn } from 'utils/misc';

const Logo = ({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      className={cn('text-3xl font-extrabold text-orange-500 transition-colors hover:text-opacity-75', className)}
      href="/"
      {...props}
    >
      YelpCamp
    </Link>
  );
};

export default Logo;
