import { IconProps } from '@/icons';
import { cn } from '@/utils/misc';

import ColoredContent from './content/colored';
import MutedContent from './content/muted';

interface NoSearchResultsIconProps extends IconProps {
  isColored?: boolean;
}

export const NoSearchResultsIcon = ({ className, isColored = false, ...props }: NoSearchResultsIconProps) => (
  <svg
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('size-36', className)}
    {...props}
  >
    {isColored ? <ColoredContent /> : <MutedContent />}
  </svg>
);
