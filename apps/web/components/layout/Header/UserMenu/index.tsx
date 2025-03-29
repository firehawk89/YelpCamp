'use client';

import { logout } from '@/utils/api/auth';
import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { LogOutIcon, SettingsIcon, UserIcon } from '@repo/ui/icons';
import Select, { SelectOption } from '@repo/ui/select';
import { routes } from 'app/routes';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import UserMenuOption from './UserMenuOption';

interface UserMenuProps extends Omit<ButtonProps, 'size' | 'icon'> {
  onLogout?: () => void;
  containerClassName?: string;
}

const UserMenu = ({ onLogout, className, containerClassName, ...props }: UserMenuProps) => {
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

  const userMenuOptions: SelectOption[] = useMemo(
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
          icon={<UserIcon className="text-accent size-6" />}
          {...props}
        />
      )}
      renderOption={({ option }) => <UserMenuOption key={option.label} option={option} />}
      position="right"
    />
  );
};

export default UserMenu;
