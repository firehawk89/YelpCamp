'use client';

import useAuthActions from '@/hooks/useAuthActions';
import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { LogOutIcon, SettingsIcon, UserIcon } from '@repo/ui/icons';
import Select, { SelectOption } from '@repo/ui/select';
import { useMemo } from 'react';
import { routes } from 'src/app/routes';

import UserMenuOption from './UserMenuOption';

interface UserMenuProps extends Omit<ButtonProps, 'size' | 'icon'> {
  onLogout?: () => void;
  containerClassName?: string;
}

const UserMenu = ({ onLogout, className, containerClassName, ...props }: UserMenuProps) => {
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
        <Button
          className={cn('border-accent h-10 w-10 rounded-full border', className)}
          onClick={toggleDropdown}
          size="icon"
          icon={<UserIcon className="text-accent size-5" />}
          {...props}
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
