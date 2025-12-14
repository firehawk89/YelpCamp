'use client';

import { cn } from '@/utils/misc';
import { useState } from 'react';

import Input, { InputProps } from '.';
import { EyeIcon } from '../../icons';

const PasswordInput = (props: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Input
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      trailingIcon={(trailingIconProps) => (
        <EyeIcon
          {...trailingIconProps}
          role="button"
          className={cn(trailingIconProps.className, 'pointer-events-auto cursor-pointer')}
          closed={isPasswordVisible}
          onClick={(event) => {
            trailingIconProps.onClick?.(event);
            togglePasswordVisibility();
          }}
        />
      )}
    />
  );
};

export default PasswordInput;
