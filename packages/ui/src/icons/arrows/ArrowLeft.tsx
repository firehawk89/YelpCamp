import { cn } from '@/utils/misc';

import { IconProps } from '..';

export const ArrowLeftIcon = ({ className, ...props }: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('size-5', className)}
    {...props}
  >
    <path
      d="M1.91073 10.5893C1.5853 10.2638 1.5853 9.73619 1.91073 9.41075L5.24407 6.07742C5.5695 5.75198 6.09714 5.75198 6.42258 6.07742C6.74802 6.40286 6.74802 6.9305 6.42258 7.25593L4.51183 9.16668L17.5 9.16668C17.9602 9.16668 18.3333 9.53977 18.3333 10C18.3333 10.4602 17.9602 10.8333 17.5 10.8333L4.51183 10.8333L6.42258 12.7441C6.74802 13.0695 6.74802 13.5972 6.42258 13.9226C6.09714 14.248 5.5695 14.248 5.24407 13.9226L1.91073 10.5893Z"
      fill="currentColor"
    />
  </svg>
);
