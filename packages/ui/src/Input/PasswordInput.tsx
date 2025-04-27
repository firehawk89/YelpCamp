'use client';

import { cn } from '@/utils/misc';
import { useState } from 'react';

import { InputProps, inputVariants } from '.';
import Button from '../Button';
import { EyeIcon } from '../icons';

interface PasswordInputProps extends Omit<InputProps, 'type'> {
  containerClassName?: string;
}

const PasswordInput = ({ containerClassName, className, variant, size, ...props }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <div className={cn('relative', containerClassName)}>
      <input
        className={cn('pr-12', inputVariants({ variant, size }), className)}
        type={isPasswordVisible ? 'text' : 'password'}
        {...props}
      />
      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={togglePasswordVisibility}
        type="button"
        icon={<EyeIcon closed={isPasswordVisible} />}
      />
    </div>
  );
};

export default PasswordInput;
