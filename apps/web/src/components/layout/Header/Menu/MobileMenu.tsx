'use client';

import { routes } from '@/app/routes';
import Overlay from '@/components/Overlay';
import useAuthActions from '@/hooks/useAuthActions';
import { cn } from '@/utils/misc';
import Button, { buttonVariants } from '@repo/ui/button';
import Divider from '@repo/ui/divider';
import { CloseIcon, LogOutIcon, MenuIcon, UserIcon } from '@repo/ui/icons';
import { HTMLAttributes, useMemo, useState } from 'react';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { User } from 'src/types/user';

import HeaderMenu from '.';
import { authMenuItems, MenuItem } from '../helpers';

interface MobileMenuProps extends HTMLAttributes<HTMLDivElement> {
  overlayClassName?: string;
  user: User | null;
  onLogout?: () => void;
}

const MobileMenu = ({ user, onLogout, overlayClassName, className, ...props }: MobileMenuProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const mobileMenuRef = useClickOutside<HTMLDivElement>(() => setIsMenuOpened(false));
  const { handleLogout } = useAuthActions({ onLogout });

  const userMenuItems = useMemo<MenuItem[]>(
    () => [
      {
        path: routes.profile(),
        label: 'Profile',
        icon: <UserIcon />,
      },
      {
        label: 'Log Out',
        onClick: handleLogout,
        icon: <LogOutIcon />,
        className: buttonVariants({ variant: 'outline', color: 'destructive', size: 'sm' }),
      },
    ],
    [handleLogout]
  );

  return (
    <>
      <Button className="lg:hidden" size="icon" icon={<MenuIcon />} onClick={() => setIsMenuOpened(true)} />

      <Overlay className={cn('lg:hidden', overlayClassName)} isHidden={!isMenuOpened} placement="right">
        <div
          ref={mobileMenuRef}
          className={cn(
            'h-full w-72 translate-x-72 bg-white px-5 py-3 transition-all',
            {
              '-translate-x-0 opacity-100': isMenuOpened,
              'translate-x-72': !isMenuOpened,
            },
            className
          )}
          {...props}
        >
          <Button
            className="ml-auto"
            size="icon"
            icon={<CloseIcon className="size-7" />}
            onClick={() => setIsMenuOpened(false)}
          />

          <div className="mt-3 flex flex-col gap-5">
            <HeaderMenu orientation="vertical" onItemClick={() => setIsMenuOpened(false)} />
            <Divider />
            <HeaderMenu
              orientation="vertical"
              items={!user ? authMenuItems : userMenuItems}
              onItemClick={() => setIsMenuOpened(false)}
            />
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default MobileMenu;
