import { cn } from '@/utils/misc';

import { IconProps } from '.';

type ChevronDirection = 'up' | 'down' | 'left' | 'right';

interface ChevronIconProps extends IconProps {
  direction?: ChevronDirection;
}

export const ChevronIcon = ({ className, direction = 'right', ...props }: ChevronIconProps) => {
  const directionClassMap: Record<ChevronDirection, string> = {
    up: 'rotate-90',
    right: 'rotate-0',
    down: 'rotate-270',
    left: 'rotate-180',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn('size-6', directionClassMap[direction], className)}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
};
