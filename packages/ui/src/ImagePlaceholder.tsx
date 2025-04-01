import { cn } from '@/utils/misc';
import { ImageIcon } from '@repo/ui/icons';
import { HTMLAttributes, ReactNode } from 'react';

interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon?: ReactNode;
}

const ImagePlaceholder = ({ icon, className, ...props }: ImagePlaceholderProps) => (
  <div
    className={cn('relative flex aspect-square items-center justify-center bg-neutral-200 text-neutral-400', className)}
    {...props}
  >
    {icon ?? <ImageIcon className="h-fit w-[25%] min-w-6 max-w-14" />}
  </div>
);

export default ImagePlaceholder;
