'use client';

import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import Divider from '@repo/ui/divider';
import { CloseIcon, MenuIcon } from '@repo/ui/icons';
import { MAIN_ROUTES, USER_AUTHENTICATED_ROUTES, USER_UNAUTHENTICATED_ROUTES } from 'app/routes';
import { FC, HTMLAttributes, useState } from 'react';

import HeaderLink from './HeaderLink';
import HeaderMenu from './HeaderMenu';

const MobileMenu: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const user = null;

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const authRoutes = !user ? USER_UNAUTHENTICATED_ROUTES : USER_AUTHENTICATED_ROUTES;

  return (
    <>
      <Button className="lg:hidden" size="icon" icon={<MenuIcon />} onClick={() => setIsMenuOpened(true)} />

      <div
        className={cn(
          'fixed right-0 top-0 z-10 flex h-screen w-full justify-end bg-neutral-900 bg-opacity-50 transition-all',
          { 'pointer-events-none opacity-0': !isMenuOpened },
          className
        )}
        {...props}
      >
        <div
          className={cn('h-full w-72 translate-x-72 bg-white px-5 py-3 transition-all', {
            '-translate-x-0 opacity-100': isMenuOpened,
            'translate-x-72': !isMenuOpened,
          })}
        >
          <Button
            className="ml-auto"
            size="icon"
            icon={<CloseIcon className="size-7" />}
            onClick={() => setIsMenuOpened(false)}
          />

          <div className="mt-3 flex flex-col gap-5">
            <HeaderMenu orientation="vertical">
              {MAIN_ROUTES.map((route) => (
                <li key={route.label}>
                  <HeaderLink className={route.linkStyles} href={route.path} icon={route.icon}>
                    {route.label}
                  </HeaderLink>
                </li>
              ))}
            </HeaderMenu>

            <Divider />

            <HeaderMenu orientation="vertical">
              {authRoutes.map((route) => (
                <li key={route.label}>
                  <HeaderLink className={route.linkStyles} href={route.path} icon={route.icon}>
                    {route.label}
                  </HeaderLink>
                </li>
              ))}
            </HeaderMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
