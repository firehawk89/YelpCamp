import { ButtonHTMLAttributes, FC } from 'react';
import { VariantProps } from 'tailwind-variants';
import { cn } from '@/utils/misc';
import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'block rounded-md active:scale-95 transition-all',
  variants: {
    variant: {
      default: 'bg-neutral-500 text-white hover:bg-opacity-85',
      outline: 'bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
      accent: 'bg-orange-500 text-white hover:bg-opacity-85',
      info: 'bg-blue-500 text-white hover:bg-opacity-85',
      success: 'bg-green-600 text-white hover:bg-opacity-85',
      error: 'bg-red-600 text-white hover:bg-opacity-85'
    },
    size: {
      default: 'px-3 py-2',
      sm: 'px-2.5 py-1.5 text-sm'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({ children, variant, size, className, ...props }) => (
  <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
    {children}
  </button>
);

export default Button;
