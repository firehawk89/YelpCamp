import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'flex items-center rounded-lg active:scale-95 transition-all',
  variants: {
    variant: {
      default: 'bg-neutral-500 hover:bg-opacity-85',
      outline: 'bg-transparent border border-neutral-500 hover:bg-neutral-500',
      accent: 'bg-accent hover:bg-opacity-85',
      info: 'bg-info hover:bg-opacity-85',
      success: 'bg-success hover:bg-opacity-85',
      destructive: 'bg-error hover:bg-opacity-85'
    },
    size: {
      default: 'px-3 py-1.5',
      sm: 'px-2 py-1 text-sm',
      icon: 'p-2'
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
      color: 'default',
      className: 'text-neutral-500 hover:text-white'
    },
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
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, variant, size, color, icon, className, ...props }) => (
  <button className={cn(buttonVariants({ variant, size: !!icon ? 'icon' : size, color }), className)} {...props}>
    {icon} {children}
  </button>
);

export default Button;
