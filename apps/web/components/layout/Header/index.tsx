import { cn } from '@/utils/misc';
import { MAIN_ROUTES, USER_AUTHENTICATED_ROUTES, USER_UNAUTHENTICATED_ROUTES } from 'app/routes';

import Logo from '../../shared/Logo';
import HeaderLink from './HeaderLink';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const user = null;

  const authRoutes = !user ? USER_UNAUTHENTICATED_ROUTES : USER_AUTHENTICATED_ROUTES;

  return (
    <header className="py-5">
      <nav className={cn('w-full flex items-center justify-between gap-3')}>
        <Logo className="basis-1/3" />

        <HeaderMenu>
          {MAIN_ROUTES.map((route) => (
            <li key={route.label}>
              <HeaderLink className={route.linkStyles} href={route.path} icon={route.icon}>
                {route.label}
              </HeaderLink>
            </li>
          ))}
        </HeaderMenu>

        <HeaderMenu className="basis-1/3 justify-end">
          {authRoutes.map((route) => (
            <li key={route.label}>
              <HeaderLink className={route.linkStyles} href={route.path} icon={route.icon}>
                {route.label}
              </HeaderLink>
            </li>
          ))}
        </HeaderMenu>
      </nav>
    </header>
  );
};

export default Header;
