import { cn } from '@/utils/misc';
import { FC, HTMLAttributes, ReactElement } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { DangerIcon } from './icons/DangerIcon';
import { InfoIcon } from './icons/InfoIcon';
import { WarningIcon } from './icons/WarningIcon';

export const alertVariants = tv({
  base: 'w-fit h-fit flex items-center gap-4 rounded-lg border bg-white',
  variants: {
    variant: {
      default: 'bg-white',
      filled: '!text-white'
    },
    color: {
      info: 'text-info border-info',
      warning: 'text-warning border-warning',
      danger: 'text-danger border-danger',
      success: 'text-success border-success'
    },
    size: {
      default: 'px-5 py-3'
    }
  },
  defaultVariants: {
    variant: 'default',
    color: 'info',
    size: 'default'
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'info',
      className: 'bg-info'
    },
    {
      variant: 'filled',
      color: 'warning',
      className: 'bg-warning'
    },
    {
      variant: 'filled',
      color: 'danger',
      className: 'bg-danger'
    },
    {
      variant: 'filled',
      color: 'success',
      className: 'bg-success'
    }
  ]
});

export const AlertIconMap: Record<string, ReactElement> = {
  info: <InfoIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof alertVariants> {}

const Alert: FC<AlertProps> = ({ children, className, variant, color, size, ...props }) => {
  const icon = AlertIconMap[color ?? 'info'];

  return (
    <div className={cn(alertVariants({ variant, color, size }), className)} {...props}>
      <div className="flex-shrink-0">{icon}</div> {children}
    </div>
  );
};

export default Alert;
