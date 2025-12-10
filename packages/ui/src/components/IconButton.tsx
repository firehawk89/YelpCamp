import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, ComponentType } from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { IconProps, LoadingIcon } from '../icons';

export const iconButtonVariants = tv({
  base: 'flex items-center justify-center rounded-lg transition-colors',
  variants: {
    variant: {
      primary: '',
      outline: '',
      transparent: '',
    },
    size: {
      default: 'p-2',
      lg: 'p-4',
    },
    color: {
      primary: 'text-shades-white bg-primary-500 hover:bg-primary active:bg-primary-700 disabled:bg-gray-300',
      secondary: 'text-shades-white bg-gray-500 hover:bg-gray-700 active:bg-gray-900 disabled:bg-gray-300',
      destructive: 'text-shades-white bg-error-500 hover:bg-error-300 active:bg-error-700 disabled:bg-gray-300',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    color: 'primary',
  },
});

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof iconButtonVariants> {
  icon: ComponentType<IconProps>;
  isLoading?: boolean;
}

const IconButton = ({
  type = 'button',
  disabled,
  variant,
  size,
  color,
  icon: IconComponent,
  isLoading,
  className,
  ...props
}: IconButtonProps) => (
  <button
    className={cn(iconButtonVariants({ variant, size, color }), className)}
    type={type}
    disabled={isLoading || disabled}
    {...props}
  >
    {isLoading ? <LoadingIcon /> : <IconComponent className={cn(size === 'lg' && 'size-6')} />}
  </button>
);

export default IconButton;
