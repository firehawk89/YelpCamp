import { UserIcon } from './icons';
import ImagePlaceholder from './ImagePlaceholder';

interface AvatarProps {
  imgSrc?: string;
  alt?: string;
}

const Avatar = ({ imgSrc, alt }: AvatarProps) =>
  imgSrc ? (
    <img src={imgSrc} alt={alt ?? 'Avatar'} className="h-12 w-12 shrink-0 rounded-full object-cover" />
  ) : (
    <ImagePlaceholder className="h-12 w-12 shrink-0 rounded-full" icon={<UserIcon className="size-6" />} />
  );

export default Avatar;
