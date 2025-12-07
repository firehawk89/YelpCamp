import { cn } from '@/utils/misc';
import { PropsWithChildren } from 'react';

import { TabItem } from './helpers';

// TODO: Apply or remove variants
// export const tabVariants = tv({
//   base: 'relative w-full flex items-center justify-center gap-2 px-2 py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full transition-colors after:transition-colors',
//   variants: {
//     color: {
//       default: 'text-inherit after:bg-neutral-200 hover:text-neutral-600 hover:after:bg-neutral-300',
//       info: 'text-inherit after:bg-neutral-200 hover:text-info hover:after:bg-info',
//       warning: 'text-inherit after:bg-neutral-200 hover:text-warning hover:after:bg-warning',
//       success: 'text-inherit after:bg-neutral-200 hover:text-success hover:after:bg-success',
//       destructive: 'text-inherit after:bg-neutral-200 hover:text-danger hover:after:bg-danger',
//     },
//     activeColor: {
//       default: 'text-accent after:bg-accent',
//       info: 'text-info after:bg-info',
//       warning: 'text-warning after:bg-warning',
//       success: 'text-success after:bg-success',
//       destructive: 'text-danger after:bg-danger',
//     },
//   },
//   defaultVariants: {
//     color: 'default',
//     activeColor: 'default',
//   },
// });

interface TabProps extends PropsWithChildren {
  isActive?: boolean;
  onClick?: () => void;
  href?: TabItem['href'];
  icon?: TabItem['icon'];
  className?: string;
}

const Tab = ({ isActive, onClick, href, icon, className, children }: TabProps) => {
  const tabClassName = cn(
    'relative w-full flex items-center justify-center gap-2 px-2 py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full transition-colors after:transition-colors after:bg-neutral-200 hover:text-accent',
    { 'text-accent after:bg-accent': isActive },
    className
  );

  return href ? (
    <a href={href} className={tabClassName}>
      {icon} {children}
    </a>
  ) : (
    <button className={tabClassName} onClick={onClick}>
      {icon} {children}
    </button>
  );
};

export default Tab;
