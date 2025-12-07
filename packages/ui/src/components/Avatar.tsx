import { cn } from '@/utils/misc';
import { ImgHTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { UserIcon } from '../icons';
import ImagePlaceholder from './ImagePlaceholder';

export const avatarVariants = tv({
  base: 'shrink-0 rounded-full object-cover object-center',
  variants: {
    size: {
      default: 'h-12 w-12',
      sm: 'h-10 w-10',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>, VariantProps<typeof avatarVariants> {
  src?: string | null;
}

const Avatar = ({ src, alt, size, className, ...props }: AvatarProps) =>
  src ? (
    <img src={src} alt={alt ?? 'Avatar'} className={cn(avatarVariants({ size }), className)} {...props} />
  ) : (
    <ImagePlaceholder
      className={cn(avatarVariants({ size }), className)}
      icon={<UserIcon className="size-[50%]" />}
      {...props}
    />
  );

export default Avatar;
