import { cn } from '@/utils/misc';
import { FC, HTMLAttributes } from 'react';

import ImageIcon from '../icons/ImageIcon';

const ImagePlaceholder: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div className={cn('relative flex justify-center items-center aspect-square bg-neutral-200', className)} {...props}>
      <ImageIcon className="size-14 text-neutral-400" />
    </div>
  );
};

export default ImagePlaceholder;
