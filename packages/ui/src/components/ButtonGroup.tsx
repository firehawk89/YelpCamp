import { cn } from '@/utils/misc';
import { Children, cloneElement, HTMLAttributes, isValidElement, ReactElement } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { ButtonProps } from './Button';

export const buttonGroupVariants = tv({
  slots: {
    base: 'inline-flex rounded-lg',
    item: 'cursor-pointer',
  },
  variants: {
    orientation: {
      horizontal: {
        base: 'flex-row',
      },
      vertical: {
        base: 'flex-col',
      },
    },
    state: {
      default: {
        item: 'bg-shades-white border-gray-300 text-gray-600 hover:bg-gray-100 active:bg-primary active:border-primary active:text-shades-white disabled:bg-shades-white disabled:text-gray-300 disabled:border-gray-300',
      },
      active: {
        item: 'bg-primary border-primary text-shades-white',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    state: 'default',
  },
});

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonGroupVariants> {
  children: ReactElement[];
}

interface GroupChildProps extends ButtonProps {
  isActive?: boolean;
}

const ButtonGroup = ({ className, orientation = 'horizontal', children, ...props }: ButtonGroupProps) => {
  const { base, item } = buttonGroupVariants({ orientation });

  return (
    <div role="group" className={cn(base(), className)} {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement<GroupChildProps>(child)) return null;

        const isFirst = index === 0;
        const isLast = index === children.length - 1;
        const isVertical = orientation === 'vertical';
        const { isActive, className: childClassName, ...childProps } = child.props;

        const itemClasses = cn(
          item({ state: isActive ? 'active' : 'default' }),

          !isVertical && !isFirst && '-ml-px rounded-l-none',
          !isVertical && !isLast && 'rounded-r-none',

          isVertical && !isFirst && '-mt-px rounded-t-none',
          isVertical && !isLast && 'rounded-b-none'
        );

        return cloneElement(child, {
          className: cn(childClassName, itemClasses),
          ...childProps,
        });
      })}
    </div>
  );
};

export default ButtonGroup;
