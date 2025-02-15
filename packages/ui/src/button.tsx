import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'flex items-center rounded-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all',
  variants: {
    variant: {
      default: 'bg-transparent hover:opacity-80',
      outline: 'bg-transparent border border-neutral-500 hover:bg-neutral-500',
      accent: 'bg-accent hover:bg-opacity-80',
      info: 'bg-info hover:bg-opacity-80',
      success: 'bg-success hover:bg-opacity-80',
      destructive: 'bg-danger hover:bg-opacity-80',
    },
    size: {
      default: 'px-3 py-1.5',
      sm: 'px-2 py-1 text-sm',
      icon: 'p-1.5',
    },
    color: {
      default: 'text-neutral-700',
      accent: 'text-accent',
      info: 'text-info',
      warning: 'text-warning',
      destructive: 'text-danger',
      success: 'text-success',
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
      color: 'destructive',
      className: 'border-danger hover:bg-danger hover:text-white',
    },
  ],
});

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, variant, size, color, icon, className, ...props }) => (
  <button className={cn(buttonVariants({ variant, size: icon ? 'icon' : size, color }), className)} {...props}>
    {icon} {children}
  </button>
);

export default Button;
