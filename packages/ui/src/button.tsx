import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { LoadingIcon } from './icons';

export const buttonVariants = tv({
  base: 'flex items-center justify-center text-center rounded-lg active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none transition-all',
  variants: {
    variant: {
      default: 'bg-transparent hover:opacity-80',
      outline: 'bg-transparent border border-neutral-500 hover:bg-neutral-500',
      accent: 'bg-accent hover:bg-opacity-80',
      info: 'bg-info hover:bg-opacity-80',
      warning: 'bg-warning hover:bg-opacity-80',
      success: 'bg-success hover:bg-opacity-80',
      destructive: 'bg-danger hover:bg-opacity-80',
    },
    size: {
      default: 'px-3 py-1.5 gap-1.5',
      sm: 'px-2 py-1 text-sm gap-1',
      lg: 'px-4 py-2 text-lg gap-2',
      icon: 'p-1.5',
    },
    color: {
      default: 'text-neutral-700',
      accent: 'text-accent',
      info: 'text-info',
      warning: 'text-warning',
      success: 'text-success',
      destructive: 'text-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    color: 'default',
  },
  compoundVariants: [
    {
      variant: 'accent',
      className: 'text-white',
    },
    {
      variant: 'info',
      className: 'text-white',
    },
    {
      variant: 'success',
      className: 'text-white',
    },
    {
      variant: 'warning',
      className: 'text-white',
    },
    {
      variant: 'destructive',
      className: 'text-white',
    },
    {
      variant: 'outline',
      color: 'default',
      className: 'hover:text-white',
    },
    {
      variant: 'outline',
      color: 'accent',
      className: 'border-accent hover:bg-accent hover:text-white',
    },
    {
      variant: 'outline',
      color: 'info',
      className: 'border-info hover:bg-info hover:text-white',
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'border-success hover:bg-success hover:text-white',
    },
    {
      variant: 'outline',
      color: 'warning',
      className: 'border-warning hover:bg-warning hover:text-white',
    },
    {
      variant: 'outline',
      color: 'destructive',
      className: 'border-danger hover:bg-danger hover:text-white',
    },
  ],
});

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  isLoading?: boolean;
}

const Button = ({
  type = 'button',
  disabled,
  variant,
  size,
  color,
  icon,
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={cn(buttonVariants({ variant, size: icon ? 'icon' : size, color }), className)}
    type={type}
    disabled={isLoading || disabled}
    {...props}
  >
    {isLoading ? <LoadingIcon /> : icon} {children}
  </button>
);

export default Button;
