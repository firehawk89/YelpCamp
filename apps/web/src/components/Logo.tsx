import { cn } from '@/utils/misc';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

const Logo = ({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link
    className={cn(
      'text-2xl font-extrabold text-orange-500 transition-colors hover:text-opacity-75 lg:text-3xl',
      className
    )}
    href="/"
    {...props}
  >
    CampZone
  </Link>
);

export default Logo;
