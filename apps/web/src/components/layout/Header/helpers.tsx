import { buttonVariants } from '@repo/ui/button';
import { UserIcon, UserPlusIcon } from '@repo/ui/icons';
import { Url } from 'next/dist/shared/lib/router/router';

export interface MenuItem {
  path?: Url;
  label: string;
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void;
}

export const defaultMenuItems: MenuItem[] = [
  { path: '/', label: 'Home' },
  { path: '/campgrounds', label: 'Campgrounds' },
];

export const authMenuItems: MenuItem[] = [
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
];
