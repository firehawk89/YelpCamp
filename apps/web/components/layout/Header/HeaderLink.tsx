import { cn } from '@/utils/misc';
import Link, { LinkProps } from 'next/link';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface HeaderAuthLinkProps extends PropsWithChildren, LinkProps {
  className?: string;
  icon?: ReactNode;
}

const HeaderLink: FC<HeaderAuthLinkProps> = ({ icon, children, className, ...props }) => (
  <Link
    className={cn('flex items-center gap-1 text-lg font-medium transition-colors hover:text-orange-500', className)}
    {...props}
  >
    {icon} {children}
  </Link>
);

export default HeaderLink;
