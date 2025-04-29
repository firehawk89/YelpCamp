import Logo from '@/components/Logo';
import { getSessionUser } from '@/server/session';
import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';

import { authMenuItems } from './helpers';
import HeaderMenu from './Menu';
import MobileMenu from './Menu/MobileMenu';
import UserMenu from './UserMenu';

const Header = async ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const user = await getSessionUser();

  return (
    <header className={cn('bg-white py-2 lg:py-3', className)} {...props}>
      <div className="container">
        <nav className={cn('flex items-center justify-between gap-3')}>
          <Logo className="basis-1/3" />

          <HeaderMenu className="max-lg:hidden" />

          <div className="flex basis-1/3 justify-end max-lg:hidden">
            {user ? <UserMenu user={user} /> : <HeaderMenu items={authMenuItems} />}
          </div>

          <MobileMenu user={user} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
