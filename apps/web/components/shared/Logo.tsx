import Link from 'next/link';
import { AnchorHTMLAttributes, FC } from 'react';
import { cn } from 'utils/misc';

const Logo: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ className, ...props }) => (
  <Link className={cn('text-2xl font-extrabold text-white', className)} href="/" {...props}>
    YelpCamp
  </Link>
);

export default Logo;
