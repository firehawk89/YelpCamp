import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, ComponentType } from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { IconProps, LoadingIcon } from '../icons';

export const iconButtonVariants = tv({
  base: 'cursor-pointer flex items-center justify-center rounded-lg border border-transparent transition-colors disabled:pointer-events-none',
  variants: {
    variant: {
      primary: 'text-shades-white disabled:bg-gray-300',
      outline: 'bg-transparent disabled:border-gray-100 disabled:text-gray-400',
      transparent: 'bg-transparent disabled:text-gray-300',
    },
    size: {
      default: 'p-2',
      compact: 'p-0',
      lg: 'p-4',
    },
    color: {
      primary: '',
      secondary: '',
      destructive: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      color: 'primary',
      className: 'bg-primary-500 hover:bg-primary active:bg-primary-700',
    },
    {
      variant: 'primary',
      color: 'secondary',
      className: 'bg-gray-500 hover:bg-gray-700 active:bg-gray-900',
    },
    {
      variant: 'primary',
      color: 'destructive',
      className: 'bg-error-500 hover:bg-error-300 active:bg-error-700',
    },

    {
      variant: 'outline',
      color: 'primary',
      className:
        'border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-50 active:border-primary-700 active:text-primary-700',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className:
        'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-100 active:bg-gray-100 active:border-gray-100',
    },
    {
      variant: 'outline',
      color: 'destructive',
      className:
        'border-error text-error hover:bg-error-50 hover:text-error-600 active:bg-error-50 active:border-error-700 active:text-error-700',
    },

    {
      variant: 'transparent',
      color: 'primary',
      className: 'text-primary-500 hover:text-primary-600 active:text-primary-700',
    },
    {
      variant: 'transparent',
      color: 'secondary',
      className: 'text-gray-500 hover:text-gray-400 active:text-gray-700',
    },
    {
      variant: 'transparent',
      color: 'destructive',
      className: 'text-error hover:text-error-200 active:text-error-700',
    },
  ],
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
    {isLoading ? <LoadingIcon /> : <IconComponent className={cn(size === 'lg' ? 'size-6' : 'size-5')} />}
  </button>
);

export default IconButton;
