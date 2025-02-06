import { buttonVariants } from '@repo/ui/button';
import { LogOutIcon, UserIcon, UserPlusIcon } from '@repo/ui/icons';
import { Url } from 'next/dist/shared/lib/router/router';
import { ReactElement } from 'react';

type Route = {
  path: Url;
  label: string;
  icon?: ReactElement;
  linkStyles?: string;
};

export const MAIN_ROUTES: Route[] = [
  { path: '/', label: 'Home' },
  { path: '/campgrounds', label: 'Campgrounds' },
];

export const USER_UNAUTHENTICATED_ROUTES: Route[] = [
  {
    path: '/login',
    label: 'Sign In',
    icon: <UserIcon />,
    linkStyles: buttonVariants({ variant: 'outline', color: 'info', size: 'sm' }),
  },
  {
    path: '/register',
    label: 'Sign Up',
    icon: <UserPlusIcon />,
    linkStyles: buttonVariants({ variant: 'outline', color: 'success', size: 'sm' }),
  },
];

export const USER_AUTHENTICATED_ROUTES: Route[] = [
  {
    path: '/logout',
    label: 'Log Out',
    icon: <LogOutIcon />,
    linkStyles: buttonVariants({ variant: 'outline', color: 'destructive', size: 'sm' }),
  },
];

export const AUTH_ROUTES = [...USER_UNAUTHENTICATED_ROUTES, ...USER_AUTHENTICATED_ROUTES];
export const ALL_ROUTES = [...MAIN_ROUTES, ...AUTH_ROUTES];
