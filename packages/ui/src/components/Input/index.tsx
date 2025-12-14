import { cn } from '@/utils/misc';
import { ComponentType, InputHTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { CheckCircleIcon, CloseCircleIcon, IconProps } from '../../icons';
import { inputVariants } from './variants';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  leadingIcon?: ComponentType<IconProps>;
  trailingIcon?: ComponentType<IconProps>;
  rootContainerClassName?: string;
  inputContainerClassName?: string;
}

const Input = ({
  label,
  helperText,
  variant,
  size,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className,
  rootContainerClassName,
  inputContainerClassName,
  ...props
}: InputProps) => {
  const { label: labelClass, base, icon: iconClass, helperText: helperTextClass } = inputVariants({ variant, size });

  const isSuccess = variant === 'success';
  const isError = variant === 'error';

  const trailingIcon = isSuccess ? (
    <CheckCircleIcon className={cn(iconClass(), 'right-3')} variant="outline" />
  ) : isError ? (
    <CloseCircleIcon className={cn(iconClass(), 'right-3')} variant="outline" />
  ) : (
    TrailingIcon && <TrailingIcon className={cn(iconClass(), 'right-3')} />
  );

  return (
    <div className={cn(rootContainerClassName)}>
      {label && (
        <label className={cn(labelClass(), 'mb-1')} htmlFor={props.id}>
          {label}
        </label>
      )}

      <div className={cn('relative', inputContainerClassName)}>
        {LeadingIcon && <LeadingIcon className={cn(iconClass(), 'left-3')} />}

        <input
          className={cn(
            base(),
            {
              'pl-10': !!LeadingIcon,
              'pr-10': !!TrailingIcon || isError || isSuccess,
            },
            className
          )}
          {...props}
        />

        {trailingIcon}
      </div>

      {helperText && <p className={cn(helperTextClass(), 'mt-2')}>{helperText}</p>}
    </div>
  );
};

export default Input;

export { inputVariants };
