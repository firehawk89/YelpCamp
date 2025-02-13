import { cn } from '@/utils/misc';
import { FC, HTMLAttributes } from 'react';

interface HeaderMenuProps extends HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
}

const HeaderMenu: FC<HeaderMenuProps> = ({ orientation = 'horizontal', children, className, ...props }) => {
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
      {children}
    </ul>
  );
};

export default HeaderMenu;
