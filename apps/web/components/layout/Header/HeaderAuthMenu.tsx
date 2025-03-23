'use client';

import { logout } from '@/utils/api/auth';
import { buttonVariants } from '@repo/ui/button';
import { LogOutIcon, UserIcon, UserPlusIcon } from '@repo/ui/icons';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { User } from 'types/user';

import HeaderMenu, { HeaderMenuProps, MenuItem } from './HeaderMenu';

interface HeaderAuthMenuProps extends Omit<HeaderMenuProps, 'routes'> {
  user: User | null;
  onLogout?: () => void;
}

const HeaderAuthMenu = ({ user, onLogout, ...props }: HeaderAuthMenuProps) => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      onLogout?.();
      router.replace('/campgrounds');
    } catch (error) {
      console.error(error);
    }
  }, [onLogout, router]);

  const menuItems = useMemo<MenuItem[]>(
    () =>
      !user
        ? [
            {
              path: '/sign-in',
              label: 'Sign In',
              icon: <UserIcon />,
              className: buttonVariants({ variant: 'outline', color: 'info', size: 'sm' }),
            },
            {
              path: '/sign-up',
              label: 'Sign Up',
              icon: <UserPlusIcon />,
              className: buttonVariants({ variant: 'outline', color: 'success', size: 'sm' }),
            },
          ]
        : [
            {
              label: 'Log Out',
              icon: <LogOutIcon />,
              className: buttonVariants({ variant: 'outline', color: 'destructive', size: 'sm' }),
              onClick: handleLogout,
            },
          ],
    [handleLogout, user]
  );

  return <HeaderMenu items={menuItems} {...props} />;
};

export default HeaderAuthMenu;
