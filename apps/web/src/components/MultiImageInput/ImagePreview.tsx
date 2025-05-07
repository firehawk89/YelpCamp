'use client';

import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import { CloseIcon } from '@repo/ui/icons';
import { HTMLMotionProps, motion, MotionProps } from 'motion/react';
import Image from 'next/image';

const ANIMATION_VARIANTS: MotionProps = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 },
};

interface ImagePreviewProps extends HTMLMotionProps<'div'> {
  image: string;
  onImageRemove?: (imageUrl: string) => void;
}

const ImagePreview = ({ image, onImageRemove, className, ...props }: ImagePreviewProps) => (
  <motion.div
    key={image}
    className={cn('relative h-32 w-48 shrink-0 overflow-hidden rounded-lg', className)}
    {...ANIMATION_VARIANTS}
    {...props}
  >
    <Button
      className="absolute right-2 top-2 z-[2]"
      onClick={() => onImageRemove?.(image)}
      icon={<CloseIcon className="size-5" />}
      variant="accent"
      size="icon-sm"
    />
    <Image className="object-cover object-center" src={image} alt="Selected campground image" fill />
  </motion.div>
);

export default ImagePreview;
