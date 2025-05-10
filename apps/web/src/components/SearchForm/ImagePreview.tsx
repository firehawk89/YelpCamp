'use client';

import { Image as ImageData } from '@/types/media';
import { cn } from '@/utils/misc';
import Button from '@repo/ui/button';
import { CloseIcon } from '@repo/ui/icons';
import { AnimatePresence, HTMLMotionProps, MotionProps } from 'motion/react';
import { motion } from 'motion/react';
import Image from 'next/image';

const ANIMATION_VARIANTS: MotionProps = {
  initial: { opacity: 0, scale: 0.9, transform: 'translateY(-50%)' },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

interface ImagePreviewProps extends HTMLMotionProps<'div'> {
  imageSource: string | null;
  searchImageId: string | null;
  onImageLoad?: (image: ImageData) => void;
  onImageRemove?: () => void;
}

const ImagePreview = ({ imageSource, searchImageId, onImageRemove, className, ...props }: ImagePreviewProps) => (
  <AnimatePresence>
    {(imageSource || searchImageId) && (
      <motion.div
        key={imageSource || searchImageId}
        className={cn('group absolute left-3 top-1/2 h-8 w-8 shrink-0 overflow-hidden rounded-lg', className)}
        {...ANIMATION_VARIANTS}
        {...props}
      >
        {imageSource && <Image className="object-cover object-center" src={imageSource} alt="Searched image" fill />}

        {onImageRemove && (
          <Button
            variant="info"
            icon={<CloseIcon />}
            onClick={onImageRemove}
            className="absolute left-0 top-0 h-full w-full opacity-0 group-hover:opacity-80"
          />
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default ImagePreview;
