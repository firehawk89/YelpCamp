'use client';

import { cn } from '@/utils/misc';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useMemo } from 'react';

import { getDefaultMenuItems, MenuItem } from '../helpers';
import MenuButton from './MenuButton';
import MenuLink from './MenuLink';

export interface HeaderMenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
  onItemClick?: () => void;
}

const HeaderMenu = ({
  items = [],
  orientation = 'horizontal',
  children,
  onItemClick,
  className,
  ...props
}: HeaderMenuProps) => {
  const t = useTranslations();

  const menuItems = useMemo<MenuItem[]>(() => (items.length ? items : getDefaultMenuItems(t)), [items, t]);

  const handleMenuItemClick = (item: MenuItem) => {
    item.onClick?.();
    onItemClick?.();
  };

  return (
    <ul
      className={cn(
        'flex flex-wrap',
        {
          'flex-row items-center gap-x-5 gap-y-4': orientation === 'horizontal',
          'flex-col gap-4': orientation === 'vertical',
        },
        className
      )}
      {...props}
    >
      {menuItems.map((item) => (
        <li key={item.label}>
          {item.path ? (
            <MenuLink
              className={item.className}
              href={item.path}
              icon={item.icon}
              onClick={() => handleMenuItemClick(item)}
            >
              {item.label}
            </MenuLink>
          ) : (
            <MenuButton className={item.className} onClick={() => handleMenuItemClick(item)} icon={item.icon}>
              {item.label}
            </MenuButton>
          )}
        </li>
      ))}

      {children}
    </ul>
  );
};

export default HeaderMenu;
