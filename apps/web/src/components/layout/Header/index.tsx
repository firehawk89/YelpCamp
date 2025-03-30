import Logo from '@/components/Logo';
import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import { getSessionUser } from 'src/utils/session';

import HeaderMenu from './HeaderMenu';
import { authMenuItems } from './helpers';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';

const Header = async ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const user = await getSessionUser();

  return (
    <header className={cn('bg-white py-2.5 lg:py-5', className)} {...props}>
      <div className="container">
        <nav className={cn('flex items-center justify-between gap-3')}>
          <Logo className="basis-1/3" />

          <HeaderMenu className="max-lg:hidden" />

          <div className="flex basis-1/3 justify-end max-lg:hidden">
            {!user && <HeaderMenu items={authMenuItems} />}
            {user && <UserMenu />}
          </div>

          <MobileMenu user={user} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
