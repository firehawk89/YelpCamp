'use client';

import { cn } from '@/utils/misc';
import { HTMLAttributes, useMemo } from 'react';

import { defaultMenuItems, MenuItem } from '../helpers';
import MenuButton from './MenuButton';
import MenuLink from './MenuLink';

export interface HeaderMenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
}

const HeaderMenu = ({ items = [], orientation = 'horizontal', children, className, ...props }: HeaderMenuProps) => {
  const menuItems = useMemo<MenuItem[]>(() => (items.length ? items : defaultMenuItems), [items]);

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
            <MenuLink className={item.className} href={item.path} icon={item.icon}>
              {item.label}
            </MenuLink>
          ) : (
            <MenuButton className={item.className} onClick={item.onClick} icon={item.icon}>
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
