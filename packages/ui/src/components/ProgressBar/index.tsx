import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { progressBarVariants } from './variants';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressBarVariants> {
  label?: string;
  percentage: number;
  metadata?: string;
}

const ProgressBar = ({ label, percentage, metadata = 'Progress', className, size, ...props }: ProgressBarProps) => {
  const {
    container,
    label: labelClass,
    progressBar,
    progressBarInner,
    metadataContainer,
    metadata: metadataClass,
    percentage: percentageClass,
  } = progressBarVariants({ size });

  const formattedPercentage = `${percentage}%`;

  return (
    <div className={cn(container(), className)} {...props}>
      {label && <span className={labelClass()}>{label}</span>}

      <div className={progressBar()}>
        <div className={progressBarInner()} style={{ width: formattedPercentage }} />
      </div>

      <div className={metadataContainer()}>
        <span className={metadataClass()}>{metadata}</span>
        <span className={percentageClass()}>{formattedPercentage}</span>
      </div>
    </div>
  );
};

export default ProgressBar;

export { progressBarVariants };
