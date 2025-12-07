import { cn } from '@/utils/misc';
import { HTMLAttributes, ReactNode } from 'react';

interface InputWrapperProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  inputId: string;
  error?: string;
  helperElement?: ReactNode;
  required?: boolean;
}

const InputWrapper = ({
  label,
  inputId,
  error,
  helperElement,
  required,
  className,
  children,
  ...props
}: InputWrapperProps) => (
  <div className={cn('flex flex-col gap-1.5', className)} {...props}>
    <div className="flex items-center justify-between gap-3">
      {label && (
        <label className="font-medium" htmlFor={inputId}>
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      {helperElement}
    </div>
    {children}
    {error && <span className="text-danger text-sm">{error}</span>}
  </div>
);

export default InputWrapper;
