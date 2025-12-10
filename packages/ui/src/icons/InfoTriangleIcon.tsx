import { cn } from '@/utils/misc';

import { IconProps } from '.';

export const InfoTriangleIcon = ({ className, ...props }: IconProps) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('size-5', className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.65408 8.08883L4.80967 2.20228C5.31162 1.26591 6.68838 1.26591 7.19033 2.20228L10.3459 8.08883C10.8123 8.9588 10.1638 10 9.15558 10H2.84442C1.83621 10 1.18772 8.9588 1.65408 8.08883ZM6 3C6.27614 3 6.5 3.22386 6.5 3.5V7C6.5 7.27614 6.27614 7.5 6 7.5C5.72386 7.5 5.5 7.27614 5.5 7V3.5C5.5 3.22386 5.72386 3 6 3ZM5.375 8.375C5.375 8.72018 5.65482 9 6 9C6.34518 9 6.625 8.72018 6.625 8.375C6.625 8.02982 6.34518 7.75 6 7.75C5.65482 7.75 5.375 8.02982 5.375 8.375Z"
      fill="currentColor"
    />
  </svg>
);
