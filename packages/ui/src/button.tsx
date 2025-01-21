import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, FC } from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'flex items-center rounded-lg active:scale-95 transition-all',
  variants: {
    variant: {
      default: 'bg-neutral-700 text-white hover:bg-opacity-85',
      outline: 'bg-transparent border border-gray text-gray hover:bg-gray hover:text-white',
      accent: 'bg-accent text-white hover:bg-opacity-85',
      info: 'bg-info text-white hover:bg-opacity-85',
      success: 'bg-success text-white hover:bg-opacity-85',
      destructive: 'bg-error text-white hover:bg-opacity-85'
    },
    size: {
      default: 'px-3 py-2',
      sm: 'px-2 py-1 text-sm'
    },
    color: {
      default: 'text-white',
      accent: 'text-accent',
      info: 'text-info',
      success: 'text-success',
      destructive: 'text-error'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    color: 'default'
  },
  compoundVariants: [
    {
      variant: 'outline',
      color: 'accent',
      className: 'border-accent hover:bg-accent hover:text-white'
    },
    {
      variant: 'outline',
      color: 'info',
      className: 'border-info hover:bg-info hover:text-white'
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'border-success hover:bg-success hover:text-white'
    },
    {
      variant: 'outline',
      color: 'destructive',
      className: 'border-error hover:bg-error hover:text-white'
    }
  ]
});

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({ children, variant, size, color, className, ...props }) => (
  <button className={cn(buttonVariants({ variant, size, color }), className)} {...props}>
    {children}
  </button>
);

export default Button;
