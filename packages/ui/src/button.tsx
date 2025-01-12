import { ButtonHTMLAttributes, FC } from 'react';
import { VariantProps } from 'tailwind-variants';
import { cn } from '@/utils/misc';
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'flex items-center rounded-lg active:scale-95 transition-all',
  variants: {
    variant: {
      default: 'bg-neutral-500 text-white hover:bg-opacity-85',
      outline: 'bg-transparent border border-neutral-500 text-neutral-500 hover:bg-neutral-500 hover:text-white',
      accent: 'bg-orange-500 text-white hover:bg-opacity-85',
      info: 'bg-blue-500 text-white hover:bg-opacity-85',
      success: 'bg-green-600 text-white hover:bg-opacity-85',
      error: 'bg-red-600 text-white hover:bg-opacity-85'
    },
    size: {
      default: 'px-3 py-2',
      sm: 'px-2 py-1 text-sm'
    },
    color: {
      default: 'text-white',
      accent: 'text-orange-500',
      info: 'text-blue-500',
      success: 'text-green-600',
      error: 'text-red-600'
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
      className: 'border-orange-500 hover:bg-orange-500 hover:text-white'
    },
    {
      variant: 'outline',
      color: 'info',
      className: 'border-blue-500 hover:bg-blue-500 hover:text-white'
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'border-green-600 hover:bg-green-600 hover:text-white'
    },
    {
      variant: 'outline',
      color: 'error',
      className: 'border-red-600 hover:bg-red-600 hover:text-white'
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
