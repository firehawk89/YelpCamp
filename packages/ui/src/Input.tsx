import { cn } from '@/utils/misc';
import { FC, InputHTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
  base: 'w-full rounded-lg outline-none transition-colors',
  variants: {
    variant: {
      default: 'border border-neutral-300 focus:shadow'
    },
    size: {
      default: 'px-3 py-1.5',
      sm: 'px-2 py-1 text-sm'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {}

const Input: FC<InputProps> = ({ className, variant, size, ...props }) => (
  <input className={cn(inputVariants({ variant, size }), className)} {...props} />
);

export default Input;
