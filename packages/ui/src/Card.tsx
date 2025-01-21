import { cn } from '@/utils/misc';
import { FC, HTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

export const cardVariants = tv({
  base: 'flex gap-4 rounded-lg bg-white shadow',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    },
    size: {
      default: 'p-4',
      compact: 'p-0'
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default'
  }
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card: FC<CardProps> = ({ children, className, orientation, size, ...props }) => (
  <div className={cn(cardVariants({ orientation, size }), className)} {...props}>
    {children}
  </div>
);

export default Card;
