import { cn } from '@/utils/misc';
import Button, { ButtonProps } from '@repo/ui/button';
import { ChevronIcon } from '@repo/ui/icons';

type PaginationButtonType = 'prev' | 'next' | 'page';

interface PaginationButtonProps extends ButtonProps {
  buttonType?: PaginationButtonType;
  isActive?: boolean;
}

const PaginationButton = ({ buttonType = 'page', isActive, className, children, ...props }: PaginationButtonProps) => {
  const isPageButton = buttonType === 'page';
  const isPrevButton = buttonType === 'prev';

  return (
    <Button
      className={cn(
        'h-10 w-10 cursor-pointer justify-center transition-none',
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
