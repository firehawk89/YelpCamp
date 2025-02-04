import { cn } from '@/utils/misc';
import { ElementType, FC, HTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

export const cardVariants = tv({
  base: 'flex rounded-lg bg-white shadow overflow-hidden',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    },
    size: {
      default: 'p-4 gap-4',
      compact: 'p-0 gap-0'
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default'
  }
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  component?: ElementType;
}

const Card: FC<CardProps> = ({ children, className, orientation, size, component: Component = 'div', ...props }) => (
  <Component className={cn(cardVariants({ orientation, size }), className)} {...props}>
    {children}
  </Component>
);

export default Card;
