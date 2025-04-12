'use client';

import useAuthActions from '@/hooks/useAuthActions';
import { User } from '@/types/user';
import { cn } from '@/utils/misc';
import Avatar from '@repo/ui/avatar';
import { LogOutIcon, SettingsIcon } from '@repo/ui/icons';
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
      { label: 'Profile', value: routes.profile() },
      { label: 'Settings', value: routes.profile('settings'), icon: <SettingsIcon /> },
      { label: 'Log Out', onClick: handleLogout, className: 'hover:bg-danger', icon: <LogOutIcon /> },
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
