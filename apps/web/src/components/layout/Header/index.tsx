import LocaleSwitcher from '@/components/layout/Header/LocaleSwitcher';
import Logo from '@/components/Logo';
import { getSessionUser } from '@/server/session';
import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';

import { authMenuItems } from './helpers';
import HeaderMenu from './Menu';
import MobileMenu from './Menu/MobileMenu';
import UserMenu from './UserMenu';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  logoOnly?: boolean;
}

const Header = async ({ className, logoOnly, ...props }: HeaderProps) => {
  const user = await getSessionUser();

  return (
    <header className={cn('bg-white py-2 lg:py-3', className)} {...props}>
      <div className="container">
        <nav className={cn('flex items-center justify-between gap-3', { 'justify-center': logoOnly })}>
          <Logo className={cn({ 'basis-1/3': !logoOnly })} />

          {!logoOnly && (
            <>
              <HeaderMenu className="max-lg:hidden" />

              <div className="flex basis-1/3 items-center justify-end gap-4 max-lg:hidden">
                {user ? <UserMenu user={user} /> : <HeaderMenu items={authMenuItems} />}
                <LocaleSwitcher />
              </div>

              <MobileMenu user={user} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
