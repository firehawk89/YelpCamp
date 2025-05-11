'use client';

import useAuthActions from '@/hooks/useAuthActions';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import Avatar from '@repo/ui/avatar';
import { HeartIcon, LogOutIcon, UserIcon } from '@repo/ui/icons';
import Select, { SelectOption } from '@repo/ui/select';
import { useMemo } from 'react';
import { routes } from 'src/app/routes';

import UserMenuOption from './UserMenuOption';

interface UserMenuProps {
  user: User;
  onLogout?: () => void;
  className?: string;
  containerClassName?: string;
}

const UserMenu = ({ user, onLogout, className, containerClassName }: UserMenuProps) => {
  const { handleLogout } = useAuthActions({ onLogout });

  const userMenuOptions = useMemo<SelectOption[]>(
    () => [
      { label: 'Profile', value: 'profile', href: routes.profile(), className: 'hover:bg-info', icon: <UserIcon /> },
      { label: 'Favorites', value: 'favorites', href: routes.profile('favorites'), icon: <HeartIcon /> },
      { label: 'Log Out', value: 'logout', onClick: handleLogout, className: 'hover:bg-danger', icon: <LogOutIcon /> },
    ],
    [handleLogout]
  );

  return (
    <Select
      className={containerClassName}
      options={userMenuOptions}
      renderButton={({ toggleDropdown }) => (
        <Avatar
          className={cn('border-accent cursor-pointer border', className)}
          src={user.avatar ?? ''}
          onClick={toggleDropdown}
        />
      )}
      renderOption={({ option, closeDropdown }) => (
        <UserMenuOption
          key={option.label}
          option={{
            ...option,
            onClick: () => {
              option.onClick?.();
              closeDropdown();
            },
          }}
        />
      )}
      position="right"
    />
  );
};

export default UserMenu;
