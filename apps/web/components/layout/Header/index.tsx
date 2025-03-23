import Logo from '@/components/shared/Logo';
import { cn } from '@/utils/misc';
import { getSessionUser } from '@/utils/session';
import { HTMLAttributes } from 'react';

import HeaderAuthMenu from './HeaderAuthMenu';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';

const Header = async ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const user = await getSessionUser();

  return (
    <header className={cn('bg-white py-2.5 lg:py-5', className)} {...props}>
      <div className="container">
        <nav className={cn('flex items-center justify-between gap-3')}>
          <Logo className="basis-1/3" />
          <HeaderMenu className="max-lg:hidden" />
          <HeaderAuthMenu className="basis-1/3 justify-end max-lg:hidden" user={user} />
          <MobileMenu user={user} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
