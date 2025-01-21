'use client';

import { cn, isHomePage } from '@/utils/misc';
import { usePathname } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  const pathname = usePathname();

  return (
    <header className={cn('py-5', className, isHomePage(pathname) ? 'bg-transparent' : 'bg-white')} {...props}>
      <div className="container">{children}</div>
    </header>
  );
};

export default Header;
