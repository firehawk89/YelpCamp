import { cn } from '@/utils/misc';
import { InputHTMLAttributes, useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import Button from '../Button';
import { EyeIcon } from '../icons';

export const inputVariants = tv({
  base: 'w-full rounded-lg outline-none transition-colors',
  variants: {
    variant: {
      default: 'border border-neutral-300 focus:shadow',
    },
    size: {
      default: 'px-3 py-1.5',
      sm: 'px-2 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = ({ type, className, variant, size, ...props }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === 'password';

  const inputElement = (
    <input
      className={cn(inputVariants({ variant, size }), { 'pr-12': isPassword }, className)}
      type={isPasswordVisible ? 'text' : type}
      {...props}
    />
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return isPassword ? (
    <div className="relative">
      {inputElement}
      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={togglePasswordVisibility}
        type="button"
        icon={<EyeIcon closed={isPasswordVisible} />}
      />
    </div>
  ) : (
    inputElement
  );
};

export default Input;
