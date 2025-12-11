import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, ComponentType } from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { IconProps, LoadingIcon } from '../icons';

export const buttonVariants = tv({
  base: 'cursor-pointer flex items-center justify-center gap-2 text-center rounded-lg border border-transparent transition-colors disabled:pointer-events-none',
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
      success: '',
      warning: '',
      info: '',
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
      variant: 'primary',
      color: 'success',
      className: 'bg-success-600 hover:bg-success active:bg-success-700',
    },
    {
      variant: 'primary',
      color: 'warning',
      className: 'text-shades-black bg-warning hover:bg-warning-200 active:bg-warning-500',
    },
    {
      variant: 'primary',
      color: 'info',
      className: 'bg-secondary-500 hover:bg-secondary-300 active:bg-secondary-600',
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
      variant: 'outline',
      color: 'success',
      className:
        'border-success text-success hover:bg-success-50 hover:text-success-600 active:bg-success-50 active:border-success-700 active:text-success-700',
    },
    {
      variant: 'outline',
      color: 'warning',
      className:
        'border-warning text-warning hover:bg-warning-50 hover:text-warning-600 active:bg-warning-50 active:border-warning-700 active:text-warning-700',
    },
    {
      variant: 'outline',
      color: 'info',
      className:
        'border-secondary text-secondary hover:bg-secondary-50 hover:text-secondary-600 active:bg-secondary-50 active:border-secondary-700 active:text-secondary-700',
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
    {
      variant: 'transparent',
      color: 'success',
      className: 'text-success hover:text-success-200 active:text-success-700',
    },
    {
      variant: 'transparent',
      color: 'warning',
      className: 'text-warning hover:text-warning-200 active:text-warning-700',
    },
    {
      variant: 'transparent',
      color: 'info',
      className: 'text-secondary hover:text-secondary-200 active:text-secondary-700',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    color: 'primary',
  },
});

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  icon?: ComponentType<IconProps>;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

const Button = ({
  type = 'button',
  disabled,
  variant,
  size,
  color,
  icon: IconComponent,
  iconPosition = 'left',
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) => {
  const icon = isLoading ? (
    <LoadingIcon />
  ) : (
    IconComponent && <IconComponent className={cn(size === 'lg' ? 'size-6' : 'size-5')} />
  );

  return (
    <button
      className={cn(buttonVariants({ variant, size, color }), className)}
      type={type}
      disabled={isLoading || disabled}
      {...props}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;
