import { routes } from '@/app/routes';
import { TFunction } from '@/types/misc';
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

export const getDefaultMenuItems = (t: TFunction): MenuItem[] => [
  { path: routes.home(), label: t('layout.header.menu.home') },
  { path: routes.campgrounds.all(), label: t('layout.header.menu.campgrounds') },
];

export const getAuthMenuItems = (t: TFunction): MenuItem[] => [
  {
    path: routes.signIn(),
    label: t('layout.header.menu.actions.signIn'),
    icon: <UserIcon />,
    className: buttonVariants({ variant: 'outline', color: 'info', size: 'sm' }),
  },
  {
    path: routes.signUp(),
    label: t('layout.header.menu.actions.signUp'),
    icon: <UserPlusIcon />,
    className: buttonVariants({ variant: 'outline', color: 'success', size: 'sm' }),
  },
];
