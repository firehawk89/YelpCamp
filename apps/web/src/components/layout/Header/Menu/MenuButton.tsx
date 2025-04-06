import { cn } from '@/utils/misc';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: ReactNode;
}

const MenuButton = ({ icon, children, className, ...props }: MenuButtonProps) => (
  <button
    className={cn(
      'flex w-fit items-center gap-1 text-lg font-medium transition-colors hover:text-orange-500',
      className
    )}
    {...props}
  >
    {icon} {children}
  </button>
);

export default MenuButton;
