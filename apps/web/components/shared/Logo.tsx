'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, FC } from 'react';
import { cn, isHomePage } from 'utils/misc';

const Logo: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ className, ...props }) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'text-2xl font-extrabold hover:text-orange-500 transition-colors',
        isHomePage(pathname) && 'text-white',
        className
      )}
      href="/"
      {...props}
    >
      YelpCamp
    </Link>
  );
};

export default Logo;
