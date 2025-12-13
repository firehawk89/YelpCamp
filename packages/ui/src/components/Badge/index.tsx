import { cn } from '@/utils/misc';
import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { badgeVariants } from './variants';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof badgeVariants> {
  label: string;
}

const Badge = ({ label, variant, size, color, className, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant, size, color }), className)} {...props}>
      <span>{label}</span>
    </div>
  );
};

export default Badge;

export { badgeVariants };
