import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import {
  CIRCUMFERENCE,
  getFormattedPercentage,
  getStrokeDashoffset,
  STROKE_BORDER_RADIUS,
  STROKE_WIDTH,
} from './helpers';
import { progressCircleVariants } from './variants';

export interface ProgressCircleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressCircleVariants> {
  percentage: number;
}

const ProgressCircle = ({ percentage, className, size, ...props }: ProgressCircleProps) => {
  const { container, percentage: percentageClass } = progressCircleVariants({ size });

  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={cn(container(), className)} {...props}>
      <svg className="size-full -rotate-90" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-100"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          cx="50"
          cy="50"
          r={STROKE_BORDER_RADIUS}
        />
        <circle
          className="stroke-primary transition-[stroke-dashoffset]"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={getStrokeDashoffset(safePercentage)}
          strokeLinecap="round"
          fill="none"
          cx="50"
          cy="50"
          r={STROKE_BORDER_RADIUS}
        />
      </svg>

      <span className={percentageClass()}>{getFormattedPercentage(safePercentage)}</span>
    </div>
  );
};

export default ProgressCircle;

export { progressCircleVariants };
