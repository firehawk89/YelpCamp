import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { ChevronIcon } from '@repo/ui/icons';
import { FC } from 'react';

type PaginationButtonType = 'prev' | 'next' | 'page';

interface PaginationButtonProps extends ButtonProps {
  buttonType?: PaginationButtonType;
  isActive?: boolean;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  buttonType = 'page',
  isActive,
  className,
  children,
  ...props
}) => {
  const isPageButton = buttonType === 'page';
  const isPrevButton = buttonType === 'prev';

  return (
    <Button
      className={cn(
        'cursor-pointer w-10 h-10 justify-center transition-none',
        isActive && 'pointer-events-none',
        className
      )}
      icon={!isPageButton && <ChevronIcon direction={isPrevButton ? 'left' : 'right'} />}
      variant={isActive ? 'default' : 'outline'}
      size="icon"
      {...props}
    >
      {isPageButton && children}
    </Button>
  );
};

export default PaginationButton;
