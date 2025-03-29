import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

export const tooltipVariants = tv({
  base: 'absolute pb-2 opacity-0 transition-opacity peer-hover:opacity-100',
  variants: {
    position: {
      top: 'bottom-full left-1/2 -translate-x-1/2',
      right: 'left-full top-1/2 -translate-y-1/2',
      bottom: 'top-full left-1/2 -translate-x-1/2',
      left: 'right-full top-1/2 -translate-y-1/2',
    },
  },
  defaultVariants: {
    position: 'top',
  },
});

interface TooltipProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof tooltipVariants> {
  label: string;
  className?: string;
  tooltipClassName?: string;
}

const Tooltip = ({ label, position, className, tooltipClassName, children, ...props }: TooltipProps) => (
  <div className={cn('relative flex', className)} {...props}>
    <div className="peer">{children}</div>
    <div className={cn(tooltipVariants({ position }), tooltipClassName)}>
      <div className="rounded-lg bg-neutral-200 px-3 py-0.5 text-sm shadow">{label}</div>
    </div>
  </div>
);

export default Tooltip;
