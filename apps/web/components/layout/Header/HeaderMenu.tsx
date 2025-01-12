'use client';

import { cn, isHomePage } from '@/utils/misc';
import { usePathname } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

const HeaderMenu: FC<HTMLAttributes<HTMLElement>> = ({ children, className, ...props }) => {
  const pathname = usePathname();

  return (
    <ul className={cn('flex items-center gap-5', isHomePage(pathname) && 'text-white', className)} {...props}>
      {children}
    </ul>
  );
};

export default HeaderMenu;
