import { cn } from '@/utils/misc';

import { IconProps } from '.';

export const LoadingIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('size-12', className)}
    {...props}
  >
    <circle cx="24" cy="24" r="16" stroke="#F56630" strokeWidth="4" strokeLinecap="round" fill="none">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 24 24"
        to="360 24 24"
        dur="1s"
        repeatCount="indefinite"
      />
      <animate attributeName="stroke-dasharray" values="0 100; 75 25; 0 100" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);
