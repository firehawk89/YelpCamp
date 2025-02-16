import { cn } from '@/utils/misc';
import { ImageIcon } from '@repo/ui/icons';
import { HTMLAttributes } from 'react';

const ImagePlaceholder = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('relative flex aspect-square items-center justify-center bg-neutral-200', className)} {...props}>
      <ImageIcon className="size-14 text-neutral-400" />
    </div>
  );
};

export default ImagePlaceholder;
