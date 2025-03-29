'use client';

import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import { HTMLAttributes, useMemo } from 'react';

import HeaderLink from './HeaderLink';
import { defaultMenuItems, MenuItem } from './helpers';

export interface HeaderMenuProps extends HTMLAttributes<HTMLElement> {
  items?: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
}

const HeaderMenu = ({ items = [], orientation = 'horizontal', children, className, ...props }: HeaderMenuProps) => {
  const menuItems = useMemo(() => (items.length ? items : defaultMenuItems), [items]);

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
            <HeaderLink className={item.className} href={item.path} icon={item.icon}>
              {item.label}
            </HeaderLink>
          ) : (
            <Button className={item.className} onClick={item.onClick} icon={item.icon}>
              {item.label}
            </Button>
          )}
        </li>
      ))}

      {children}
    </ul>
  );
};

export default HeaderMenu;
