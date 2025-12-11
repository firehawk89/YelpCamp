import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, ComponentType } from 'react';
import { VariantProps } from 'tailwind-variants';

import { IconProps, LoadingIcon } from '../../icons';
import { buttonVariants } from './variants';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  icon?: ComponentType<IconProps>;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

const Button = ({
  type = 'button',
  disabled,
  variant,
  size,
  color,
  icon: IconComponent,
  iconPosition = 'left',
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) => {
  const icon = isLoading ? (
    <LoadingIcon />
  ) : (
    IconComponent && <IconComponent className={cn(size === 'lg' ? 'size-6' : 'size-5')} />
  );

  return (
    <button
      className={cn(buttonVariants({ variant, size, color }), className)}
      type={type}
      disabled={isLoading || disabled}
      {...props}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;

export { buttonVariants };
