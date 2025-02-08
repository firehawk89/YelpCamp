import { cn } from '@/utils/misc';
import { FC, HTMLAttributes } from 'react';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider: FC<DividerProps> = ({ orientation = 'horizontal', className, ...props }) => (
  <div
    className={cn(
      'shrink-0 bg-neutral-300',
      { 'h-px w-full': orientation === 'horizontal', 'h-full w-px': orientation === 'vertical' },
      className
    )}
    {...props}
  />
);

export default Divider;
