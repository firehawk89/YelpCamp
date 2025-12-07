import { cn } from '@/utils/misc';
import { ImgHTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { UserIcon } from '../icons';
import ImagePlaceholder from './ImagePlaceholder';

export const avatarVariants = tv({
  base: 'shrink-0 rounded-full object-cover object-center',
  variants: {
    size: {
      xs: 'size-6',
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12',
      xl: 'size-14',
      xxl: 'size-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof avatarVariants> {}

const Avatar = ({ src, alt, size, className, ...props }: AvatarProps) =>
  src ? (
    <img src={src} alt={alt ?? 'Avatar'} className={cn(avatarVariants({ size }), className)} {...props} />
  ) : (
    <ImagePlaceholder
      className={cn(avatarVariants({ size }), className)}
      icon={<UserIcon className="size-1/2" />}
      {...props}
    />
  );

export default Avatar;
