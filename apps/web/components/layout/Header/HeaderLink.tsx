import { cn } from '@/utils/misc';
import Link, { LinkProps } from 'next/link';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface HeaderAuthLinkProps extends PropsWithChildren, LinkProps {
  className?: string;
  icon?: ReactNode;
}

const HeaderLink: FC<HeaderAuthLinkProps> = ({ icon, children, className, ...props }) => (
  <Link
    className={cn('text-lg font-medium flex items-center gap-1 hover:text-orange-500 transition-colors', className)}
    {...props}
  >
    {icon} {children}
  </Link>
);

export default HeaderLink;
