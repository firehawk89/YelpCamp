import { IconProps } from '@/icons';
import { NoImageIcon } from '@/icons/empty-states/NoImageIcon';
import { cn } from '@/utils/misc';
import { ComponentType, HTMLAttributes } from 'react';

export interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ComponentType<IconProps>;
}

const ImagePlaceholder = ({ icon: IconComponent, className, ...props }: ImagePlaceholderProps) => (
  <div
    className={cn(
      'text-shades-black relative flex aspect-square items-center justify-center bg-neutral-100',
      className
    )}
    {...props}
  >
    {IconComponent ? <IconComponent className="text-neutral size-1/2" /> : <NoImageIcon className="size-1/2" />}
  </div>
);

export default ImagePlaceholder;
