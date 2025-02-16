import Logo from '@/components/shared/Logo';
import { cn } from '@/utils/misc';
import { MAIN_ROUTES, USER_AUTHENTICATED_ROUTES, USER_UNAUTHENTICATED_ROUTES } from 'app/routes';
import { HTMLAttributes } from 'react';

import HeaderLink from './HeaderLink';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';

const Header = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const user = null;
  const authRoutes = !user ? USER_UNAUTHENTICATED_ROUTES : USER_AUTHENTICATED_ROUTES;

  return (
    <header className={cn('bg-white py-2.5 lg:py-5', className)} {...props}>
      <div className="container">
        <nav className={cn('flex items-center justify-between gap-3')}>
          <Logo className="basis-1/3" />

          <HeaderMenu className="max-lg:hidden">
            {MAIN_ROUTES.map((route) => (
              <li key={route.label}>
                <HeaderLink className={route.linkStyles} href={route.path} icon={route.icon}>
                  {route.label}
                </HeaderLink>
              </li>
            ))}
          </HeaderMenu>

          <HeaderMenu className="basis-1/3 justify-end max-lg:hidden">
            {authRoutes.map((route) => (
              <li key={route.label}>
                <HeaderLink className={route.linkStyles} href={route.path} icon={route.icon}>
                  {route.label}
                </HeaderLink>
              </li>
            ))}
          </HeaderMenu>

          <MobileMenu overlayClassName="lg:hidden" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
