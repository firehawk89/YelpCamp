import { cn } from '@/utils/misc';
import { HTMLAttributes, ReactNode } from 'react';

import { ImageIcon } from '../icons';

interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}

const ImagePlaceholder = ({ icon, className, ...props }: ImagePlaceholderProps) => (
  <div
    className={cn('bg-primary-50 text-shades-black relative flex aspect-square items-center justify-center', className)}
    {...props}
  >
    {icon ?? <ImageIcon className="h-fit w-1/4 min-w-6 max-w-14" />}
  </div>
);

export default ImagePlaceholder;
