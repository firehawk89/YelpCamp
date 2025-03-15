import { cn } from '@/utils/misc';
import { HTMLAttributes, ReactNode } from 'react';

interface InputWrapperProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  inputId: string;
  error?: string;
  helperElement?: ReactNode;
}

const InputWrapper = ({ label, inputId, error, helperElement, className, children, ...props }: InputWrapperProps) => (
  <div className={cn('flex flex-col gap-1.5', className)} {...props}>
    <div className="flex items-center justify-between gap-3">
      {label && (
        <label className="font-medium" htmlFor={inputId}>
          {label}
        </label>
      )}
      {helperElement}
    </div>
    {children}
    {error && <span className="text-danger text-sm">{error}</span>}
  </div>
);

export default InputWrapper;
