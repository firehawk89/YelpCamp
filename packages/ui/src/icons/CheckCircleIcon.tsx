import { cn } from '@/utils/misc';

import { IconProps } from '.';

export const CheckCircleIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 9"
    width="9"
    height="9"
    fill="none"
    className={cn('size-5', className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 9C6.98528 9 9 6.98528 9 4.5C9 2.01472 6.98528 0 4.5 0C2.01472 0 0 2.01472 0 4.5C0 6.98528 2.01472 9 4.5 9ZM6.3377 3.86873C6.54134 3.68222 6.55523 3.36594 6.36873 3.1623C6.18222 2.95866 5.86594 2.94477 5.6623 3.13127L3.81626 4.82199L3.3377 4.38369C3.13406 4.19719 2.81778 4.21107 2.63128 4.41472C2.44477 4.61836 2.45866 4.93463 2.6623 5.12114L3.47856 5.86872C3.66967 6.04376 3.96285 6.04376 4.15396 5.86872L6.3377 3.86873Z"
      fill="currentColor"
    />
  </svg>
);
