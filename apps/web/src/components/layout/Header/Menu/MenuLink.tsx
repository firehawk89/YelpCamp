import { cn } from '@/utils/misc';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';

interface MenuLinkProps extends PropsWithChildren, LinkProps {
  className?: string;
  icon?: ReactNode;
}

const MenuLink = ({ icon, children, className, ...props }: MenuLinkProps) => (
  <Link
    className={cn(
      'flex w-fit items-center gap-1 text-lg font-medium transition-colors hover:text-orange-500',
      className
    )}
    {...props}
  >
    {icon} {children}
  </Link>
);

export default MenuLink;
