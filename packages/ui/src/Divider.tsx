import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider = ({ orientation = 'horizontal', className, ...props }: DividerProps) => (
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
